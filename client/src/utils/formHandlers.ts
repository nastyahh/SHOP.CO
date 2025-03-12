type ApiResponse =
  | { data: { message: string } }
  | { error: { data: { message: string } } };

export const handleInput = <T extends object>(
  e: React.ChangeEvent<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >,
  setState: React.Dispatch<React.SetStateAction<T>>
) => {
  const { name, value } = e.target;

  setState((prev) => ({
    ...prev,
    [name]: value,
  }));
};

export const handleSubmit = async <T>(
  e: React.FormEvent<HTMLFormElement>,
  request: (data: T) => Promise<ApiResponse>,
  reqData: T,
  showNotification: (message: string) => void,
  resetState: () => void
) => {
  e.preventDefault();

  const result = await request(reqData);
  if ("data" in result) {
    showNotification(result.data.message);
    resetState();
  } else showNotification(result.error.data.message);

  return result;
};
