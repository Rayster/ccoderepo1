import { Composition } from 'remotion';
import { AIVideo } from './AIVideo';

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="AIRobotsVideo"
      component={AIVideo}
      durationInFrames={900}
      fps={30}
      width={1280}
      height={720}
    />
  );
};
