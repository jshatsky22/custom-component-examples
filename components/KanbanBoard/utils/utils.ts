export const findColumnIndex = (columnId: number, board: any) => {
  const columnIndex = board.columns.findIndex((column: { id: any }) => {
    return column.id === columnId;
  });
  return columnIndex;
};

export const findCardIndices = (cardId: number, board: any) => {
  const columnIndex = board.columns.findIndex((column: { cards: any[] }) =>
    column.cards.some((card) => card.id === cardId)
  );

  const cardIndex =
    columnIndex !== -1
      ? board.columns[columnIndex].cards.findIndex(
          (card: { id: any }) => card.id === cardId
        )
      : -1;

  return { columnIndex, cardIndex };
};
