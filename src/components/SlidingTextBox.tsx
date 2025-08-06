import { useEffect, useRef } from "react";
import styles from "./SlidingTextBox.module.css";

const initialize = (containerBox: HTMLElement) => {
  const contentBox = containerBox.querySelector<HTMLElement>("." + styles.contentBox);

  const resizeObserver = new ResizeObserver((_) => {
    containerBox.style.minHeight = contentBox?.scrollHeight + "px";
  });

  if (contentBox) resizeObserver.observe(contentBox);

  return {
    dispose: () => {
      if (contentBox) resizeObserver.unobserve(contentBox);
      resizeObserver.disconnect();
    },
  };
};

export const SlidingTextBox = ({ text }: { text: string }) => {
  const containerBoxRef = useRef<HTMLDivElement>(null);
  const initialRendering = useRef(true);
  const cssClass = styles.containerBox + (initialRendering.current ? ` ${styles.initial}` : "");

  useEffect(() => {
    initialRendering.current = false;

    const containerBox = containerBoxRef.current;
    if (!containerBox) return;
    const { dispose } = initialize(containerBox);
    return () => dispose();
  }, []);

  return (
    <div ref={containerBoxRef} className={cssClass}>
      <div className={styles.contentBox}>{text}</div>
    </div>
  );
};
