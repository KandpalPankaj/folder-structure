import ActionButton from "./ActionButton";

const ActionButtons = ({
  isFolder,
  isRootFolder,
  onAddFolder,
  onRename,
  onDelete,
}) => {
  const buttonStyles = {
    folder: "bg-green-500 hover:bg-green-600",
    file: "bg-blue-500 hover:bg-blue-600",
    rename: "bg-yellow-500 hover:bg-yellow-600",
    delete: "bg-red-500 hover:bg-red-600",
  };

  return (
    <div className="flex space-x-2">
      {isFolder && (
        <>
          <ActionButton
            onClick={() => onAddFolder(true)}
            className={buttonStyles.folder}
          >
            Folder +
          </ActionButton>
          <ActionButton
            onClick={() => onAddFolder(false)}
            className={buttonStyles.file}
          >
            File +
          </ActionButton>
        </>
      )}
      <ActionButton onClick={onRename} className={buttonStyles.rename}>
        Rename
      </ActionButton>
      {!isRootFolder && (
        <ActionButton onClick={onDelete} className={buttonStyles.delete}>
          Delete
        </ActionButton>
      )}
    </div>
  );
};

export default ActionButtons;
