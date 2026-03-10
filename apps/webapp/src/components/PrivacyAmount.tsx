import { usePrivacy } from '../lib/privacy';

type PrivacyAmountProps = {
  value: number;
  className?: string;
  showSign?: boolean;
};

export default function PrivacyAmount({
  value,
  className = '',
  showSign = false,
}: PrivacyAmountProps) {
  const { privacyMode } = usePrivacy();

  const formattedValue = Math.abs(value).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  const sign = showSign ? (value > 0 ? '+ ' : value < 0 ? '- ' : '') : '';

  return (
    <span
      className={`${className} transition-all duration-300 ${
        privacyMode ? 'blur-md select-none opacity-60' : ''
      }`}
    >
      {sign}
      {formattedValue}
    </span>
  );
}
