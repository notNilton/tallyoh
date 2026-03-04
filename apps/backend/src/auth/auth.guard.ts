import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Request } from 'express';
import { createRemoteJWKSet, jwtVerify } from 'jose';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class WorkOsAuthGuard implements CanActivate {
  private readonly jwksUrl: URL;

  constructor(private readonly db: DatabaseService) {
    const clientId = process.env.WORKOS_CLIENT_ID || '';
    if (!clientId) {
      console.warn('WORKOS_CLIENT_ID is not set!');
    }
    // O endpoint JWKS da WorkOS tem esse formato genérico:
    this.jwksUrl = new URL(`https://api.workos.com/sso/jwks/${clientId}`);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Token não fornecido.');
    }

    let payload;
    try {
      const JWKS = createRemoteJWKSet(this.jwksUrl);
      const result = await jwtVerify(token, JWKS);
      payload = result.payload;
    } catch {
      // Falha na assinatura, expirado, ou clientId errado.
      throw new UnauthorizedException('Token JWT inválido ou expirado.');
    }

    // Traduz o ID do WorkOS (payload.sub) para o ID interno da nossa DB
    const user = await this.db.user.findUnique({
      where: { workosId: payload.sub as string },
    });

    if (!user) {
      throw new ForbiddenException(
        'Usuário autenticado, mas não cadastrado na plataforma (via webhook ainda).',
      );
    }

    request.user = user;
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] =
      (request.headers.authorization as string)?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
