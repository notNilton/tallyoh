#!/bin/bash
# Hook: roda `prisma generate` automaticamente após editar schema.prisma

INPUT=$(cat)
FILE=$(echo "$INPUT" | jq -r '.tool_input.file_path // ""')

if [[ "$FILE" == *"schema.prisma"* ]]; then
  echo "🔄 schema.prisma alterado — rodando prisma generate..."
  cd packages/database && npx prisma generate --silent 2>&1
  echo "✅ prisma generate concluído."
fi

exit 0
