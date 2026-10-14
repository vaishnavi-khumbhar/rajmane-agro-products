import { motion, type HTMLMotionProps } from 'framer-motion';

/**
 * Scroll reveal. Content is rendered in the DOM from the start; motion only animates opacity/translate.
 * MotionConfig reducedMotion="user" (App.tsx) disables the transform for users who prefer reduced motion.
 */
export function Reveal({ delay = 0, y = 24, as = 'div', children, ...rest }: HTMLMotionProps<'div'> & { delay?: number; y?: number; as?: 'div' | 'li' }) {
  const Comp = (as === 'li' ? motion.li : motion.div) as typeof motion.div;
  return (
    <Comp
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
      {...rest}
    >
      {children}
    </Comp>
  );
}
