export const getItemStyle = (isDragging:boolean, draggableStyle) => ({
  border: isDragging ? "1px solid rgb(189, 203, 210)" : "",
  background: isDragging ? "rgb(200, 200, 198)" : "",
  ...draggableStyle,
});
