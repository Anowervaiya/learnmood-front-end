export default function formatAge(dob: string | Date) {
  const birthDate = new Date(dob);
  const today = new Date();

  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();

  if (months < 0 || (months === 0 && today.getDate() < birthDate.getDate())) {
    years--;
    months = (months + 12) % 12;
  }

  if (today.getDate() < birthDate.getDate()) {
    months--;
    if (months < 0) months += 12;
  }

  return `${years} year${years > 1 ? 's' : ''} ${months} month${
    months > 1 ? 's' : ''
  }`;
}
