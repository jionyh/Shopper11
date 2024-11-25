const formatDistance = (distance: number) => {
  return (
    new Intl.NumberFormat("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(distance / 1000) + " km"
  );
};

const formatDate = (date: string | Date) => {
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(date).toLocaleDateString("pt-BR", options);
};

const formatDuration = (second: string) => {
  const durationInSeconds = parseInt(second.replace("s", ""));
  const hours = Math.floor(durationInSeconds / 3600);
  const minutes = Math.floor((durationInSeconds % 3600) / 60);
  const seconds = durationInSeconds % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return seconds > 0 ? `${minutes}m ${seconds}s` : `${minutes}m`;
};

const formatValue = (value: number) => {
  return Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

const capitalize = (text: string): string => {
  const capitalized = text
    .split(" ")
    .map((word) => {
      if (!word) return ""; // se encontrar alguma palavra em branco
      return word[0].toUpperCase() + word.substring(1).toLowerCase();
    })
    .join(" ");
  return capitalized;
};

export default {
  formatDate,
  formatDistance,
  formatDuration,
  formatValue,
  capitalize,
};
