import React, { FC, useEffect, useState } from "react";
import { Button, Popover } from "antd";
import { TooltipPlacement } from "antd/es/tooltip";
import { Mask } from "./Mask";
import { createPortal } from "react-dom";
import './index.scss';

export interface OnBoardingStepConfig {
  selector: () => HTMLElement | null;
  placement?: TooltipPlacement;
  renderContent?: (currentStep: number) => React.ReactNode;
  beforeForward?: (currentStep: number) => void;
  beforeBack?: (currentStep: number) => void;
}

export interface OnBoardingProps {
  step?: number;
  steps: OnBoardingStepConfig[];
  getContainer?: () => HTMLElement;
  onStepEnd?: () => void;
}

export const OnBoarding: FC<OnBoardingProps> = (props) => {
  const {
    step = 0,
    steps,
    onStepEnd,
    getContainer,
  } = props;

  const [currentStep, setCurrentStep] = useState(0);

  const currentSelectedElement = steps[currentStep]?.selector();

  const currentContainerElement = getContainer?.() || document.documentElement;

  const [done, setDone] = useState(false);

  const [isMaskMoving, setIsMaskMoving] = useState(false);

  const getCurrentStep = () => steps[currentStep];

  const back = async () => {
    if (currentStep === 0) return;

    const { beforeBack } = getCurrentStep();
    await beforeBack?.(currentStep);
    setCurrentStep(currentStep - 1);
  }

  const forward = async () => {
    if (currentStep === steps.length - 1) {
      await onStepEnd?.();
      setDone(true);
      return;
    }

    const { beforeForward } = getCurrentStep();
    await beforeForward?.(currentStep);
    setCurrentStep(currentStep + 1);
  }

  useEffect(() => {
    setCurrentStep(step);
  }, [step]);

  const renderPopover = (wrapper: React.ReactNode) => {
    const config = getCurrentStep();
    if (!config) wrapper;

    const { renderContent } = config;
    const content = renderContent ? renderContent(currentStep) : null;

    const operation = (
      <div className={'onboarding-operation'}>
        {
          currentStep !== 0 &&
          <Button
            className={'back'}
            onClick={() => back()}>
            {'上一步'}
          </Button>
        }
        <Button
          className={'forward'}
          type={'primary'}
          onClick={() => forward()}>
          {currentStep === steps.length - 1 ? '我知道了' : '下一步'}
        </Button>
      </div>
    );

    return (
      isMaskMoving ? wrapper : <Popover
        content={
          <div>
            {content}
            {operation}
          </div>
        }
        open={true}
        placement={getCurrentStep()?.placement}
      >
        {wrapper}
      </Popover>
    )
  };

  const [, setRenderTick] = useState(0);

  useEffect(() => {
    setRenderTick(1);
  }, []);

  if (!currentSelectedElement || done) return null;

  const mask = <Mask
    onAnimationStart={() => { setIsMaskMoving(true) }}
    onAnimationEnd={() => { setIsMaskMoving(false) }}
    container={currentContainerElement}
    element={currentSelectedElement}
    renderMaskContent={(wrapper) => renderPopover(wrapper)}
  />

  return createPortal(mask, currentContainerElement);
}