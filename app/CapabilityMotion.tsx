type CapabilityMotionProps = {
  kind: "activate" | "scale";
};

function ActivateMotion() {
  return (
    <div className="capability-motion capability-motion-activate" aria-hidden="true">
      <div className="capability-motion-grid" />
      <div className="activate-platform" />
      <div className="activate-orbit activate-orbit-one"><i /><i /></div>
      <div className="activate-orbit activate-orbit-two"><i /><i /></div>
      <div className="activate-orbit activate-orbit-three"><i /><i /></div>
      <div className="activate-kernel"><i /></div>
      <span className="activate-node activate-node-one" />
      <span className="activate-node activate-node-two" />
      <span className="activate-node activate-node-three" />
      <span className="activate-node activate-node-four" />
    </div>
  );
}

function ScaleMotion() {
  return (
    <div className="capability-motion capability-motion-scale" aria-hidden="true">
      <div className="capability-motion-grid" />
      <div className="scale-orbit"><i /><i /></div>
      <div className="scale-columns">
        <i /><i /><i /><i /><i /><i /><i />
      </div>
      <div className="scale-signal"><i /></div>
      <span className="scale-sphere" />
      <span className="scale-pulse scale-pulse-one" />
      <span className="scale-pulse scale-pulse-two" />
    </div>
  );
}

export default function CapabilityMotion({ kind }: CapabilityMotionProps) {
  return kind === "activate" ? <ActivateMotion /> : <ScaleMotion />;
}
