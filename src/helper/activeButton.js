export const ableInButton = (dataArray) => {
  const ableInButton =
    dataArray &&
    dataArray?.length !== 0 &&
    ((dataArray[0]?.in_am && dataArray[0]?.out_am === null) ||
      dataArray[0]?.out_pm !== null ||
      (dataArray[0]?.in_pm !== null && dataArray[0]?.out_pm === null));
  return ableInButton;
};

export const ableOutButton = (dataArray, activeInButton) => {
  const ableOutButton =
    !activeInButton ||
    (dataArray && dataArray.length !== 0 && dataArray[0]?.out_pm !== null);
  return ableOutButton;
};
