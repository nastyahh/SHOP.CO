import React from "react";

export const handleInput = <T extends object>(
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  setState: React.Dispatch<React.SetStateAction<T>>
) => {
  const { name, value } = e.target;

  setState((prev) => ({
    ...prev,
    [name]: value,
  }));
};

export const handleSubmit = async (
  e: React.FormEvent<HTMLFormElement>,
  request: (data: { name: string }) => Promise<{ data: { message: string } }>,
  reqData: { name: string },
  showNotification: (message: string) => void,
  resetState: () => void
) => {
  e.preventDefault();
  const result = await request(reqData);
  console.log(result);
  if (result?.data?.message) {
    showNotification(result.data.message);
    resetState();
  } else showNotification(result.error.data.message);

  return result;
};
