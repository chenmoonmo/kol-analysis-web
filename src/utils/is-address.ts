export const isAddress = (address: string): boolean => {
  return address.length === 42 && address.startsWith("0x");
};
