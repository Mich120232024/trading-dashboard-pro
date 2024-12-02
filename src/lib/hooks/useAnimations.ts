import { useEffect, useState, useCallback } from 'react';

type AnimationConfig = {
  duration?: number;
  delay?: number;
  initialScale?: number;
  targetScale?: number;
};

type AnimationState = {
  scale: number;
  opacity: number;
  translateY: number;
  translateX: number;
};

export const useLoadingAnimation = (isLoading: boolean) => {
  const [opacity, setOpacity] = useState(0);
  const [scale, setScale] = useState(0.9);

  useEffect(() => {
    if (isLoading) {
      setOpacity(1);
      setScale(1);
    } else {
      setOpacity(0);
      setScale(0.9);
    }
  }, [isLoading]);

  return {
    opacity,
    scale,
    style: {
      opacity,
      transform: `scale(${scale})`,
      transition: 'opacity 0.2s ease-out, transform 0.2s ease-out'
    }
  };
};

export const useHoverAnimation = (config: AnimationConfig = {}) => {
  const {
    duration = 200,
    initialScale = 1,
    targetScale = 1.05
  } = config;

  const [state, setState] = useState<AnimationState>({
    scale: initialScale,
    opacity: 1,
    translateY: 0,
    translateX: 0
  });

  const handleMouseEnter = useCallback(() => {
    setState(prev => ({
      ...prev,
      scale: targetScale,
      translateY: -4
    }));
  }, [targetScale]);

  const handleMouseLeave = useCallback(() => {
    setState(prev => ({
      ...prev,
      scale: initialScale,
      translateY: 0
    }));
  }, [initialScale]);

  const style = {
    transform: `scale(${state.scale}) translateY(${state.translateY}px)`,
    transition: `transform ${duration}ms ease-out`,
  };

  return {
    style,
    handlers: {
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave
    }
  };
};

export const useNumberTransition = (value: number, duration: number = 500) => {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    let startValue = displayValue;
    const endValue = value;
    const startTime = performance.now();
    
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      
      const currentValue = startValue + (endValue - startValue) * easeOutQuart;
      setDisplayValue(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value, duration]);

  return displayValue;
};

export const useSmoothTransition = () => {
  const [isTransitioning, setIsTransitioning] = useState(false);

  const transition = useCallback(async (callback: () => void | Promise<void>) => {
    setIsTransitioning(true);
    try {
      await callback();
    } finally {
      setIsTransitioning(false);
    }
  }, []);

  return {
    isTransitioning,
    transition,
    style: {
      opacity: isTransitioning ? 0.5 : 1,
      pointerEvents: isTransitioning ? 'none' : 'auto',
      transition: 'opacity 0.2s ease-out'
    }
  };
};

export const usePageTransition = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const variants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 }
  };

  return {
    isMounted,
    variants,
    transition: { duration: 0.2 }
  };
};
