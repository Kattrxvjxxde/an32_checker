import React from 'react';
import {
  Stage,
  Layer,
  Line,
  Rect,
} from 'react-konva';
import useImage from 'use-image';
import criticalBg from '../images/critical_bg.png';
import an32CriticalBg from '../images/an32_critical_bg.png';

type ImageFigureProps = {
  interval: number;
  criticalSec: number;
};

const ImageFigure: React.FC<ImageFigureProps> = (props: ImageFigureProps) => {
  const { interval, criticalSec } = props;

  const criticalHeight = (200 * (500 / 12)) / interval;
  const an32CriticalHeight = (200 * criticalSec) / interval;

  const [criticalBgImg] = useImage(criticalBg);
  const [an32CriticalBgImg] = useImage(an32CriticalBg);

  return (
    <Stage width={240} height={400}>
      <Layer ariaLabel="notesLanes">
        <Line x={1} y={0} points={[0, 0, 0, 400]} stroke="#fff" opacity={0.5} />
        <Line x={120} y={0} points={[0, 0, 0, 400]} stroke="#fff" opacity={0.5} />
        <Line x={239} y={0} points={[0, 0, 0, 400]} stroke="#fff" opacity={0.5} />
      </Layer>

      <Layer ariaLabel="criticalAreas">
        <Rect
          x={4}
          y={300 - criticalHeight}
          width={113}
          height={2 * criticalHeight}
          fillPatternImage={criticalBgImg}
        />
        <Rect
          x={123}
          y={100 - criticalHeight}
          width={113}
          height={2 * criticalHeight}
          fillPatternImage={criticalBgImg}
        />
      </Layer>

      {an32CriticalHeight > 0 && (
        <Layer ariaLabel="an32CriticalAreas">
          <Rect
            x={4}
            y={300 - criticalHeight}
            width={231}
            height={an32CriticalHeight}
            stroke="rgba(255, 136, 136, 0.8)"
            fillPatternImage={an32CriticalBgImg}
          />
        </Layer>
      )}

      <Layer ariaLabel="notesObjects">
        <Rect x={10} y={292} width={100} height={16} fill="#fff" stroke="rgba(0, 0, 0, 0.4)" strokeWidth={4} />
        <Rect x={129} y={92} width={100} height={16} fill="#fff" stroke="rgba(0, 0, 0, 0.4)" strokeWidth={4} />
      </Layer>
    </Stage>
  );
};

export default ImageFigure;
