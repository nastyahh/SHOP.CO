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
  try {
    const result = await request(reqData);
    showNotification(result.data.message);
    resetState();

    return result;
  } catch (error) {
    console.log("Ошибка при отправке данных:", error);
  }
};
