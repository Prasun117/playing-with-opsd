import { useOpenSeaDragonContext } from "./OpenSeaDragonContext";

const SyncButton = () => {
  const { syncState, setSyncState } = useOpenSeaDragonContext();
  const handleSync = () => {};
  return (
    <>
      <button onClick={() => setSyncState(!syncState)}>
        Sync {syncState ? "on" : "off"}
      </button>
    </>
  );
};

export default SyncButton;
