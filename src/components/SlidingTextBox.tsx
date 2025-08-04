import { useEffect, useRef } from "react";
import styles from "./SlidingTextBox.module.css";

export const initialize = (containerBox: HTMLElement) => {
  const resizeObserver = new ResizeObserver((_) => {
    containerBox.style.minHeight = contentBox?.scrollHeight + "px";
  });

  const contentBox = containerBox.querySelector<HTMLElement>("." + styles.contentBox);
  if (contentBox) resizeObserver.observe(contentBox);

  return {
    dispose: () => {
      if (contentBox) resizeObserver.unobserve(contentBox);
      resizeObserver.disconnect();
    },
  };
};

export const updateHeight = (containerBox: HTMLElement) => {
  const contentBox = containerBox.querySelector<HTMLElement>("." + styles.contentBox);
  containerBox.style.minHeight = contentBox?.scrollHeight + "px";
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
    updateHeight(containerBox);
    return () => dispose();
  }, []);

  return (
    <div ref={containerBoxRef} className={cssClass}>
      <div className={styles.contentBox}>{text}</div>
    </div>
  );
};
