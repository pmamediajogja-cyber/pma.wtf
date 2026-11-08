import { startSwarmRebuild } from "../swarmRebuild";

export default function SwarmButton() {
  return (
    <button
      type="button"
      className="button button-ghost swarm-trigger"
      onClick={() => startSwarmRebuild()}
      aria-label="Rebuild this page with a cursor swarm"
    >
      <span aria-hidden="true">↻</span> Swarm rebuild
    </button>
  );
}
