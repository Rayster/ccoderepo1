import { AbsoluteFill, Sequence } from 'remotion';
import { Scene1 } from './scenes/Scene1';
import { Scene2 } from './scenes/Scene2';
import { Scene3 } from './scenes/Scene3';
import { Scene4 } from './scenes/Scene4';
import { Scene5 } from './scenes/Scene5';
import { Scene6 } from './scenes/Scene6';
import { Scene7 } from './scenes/Scene7';
import { Scene8 } from './scenes/Scene8';
import { Scene9 } from './scenes/Scene9';

// 30s at 30fps = 900 frames
// Scene timing (frames):
//   Scene 1:  0–89    (0:00–0:03)
//   Scene 2:  90–179  (0:03–0:06)
//   Scene 3:  180–269 (0:06–0:09)
//   Scene 4:  270–389 (0:09–0:13)
//   Scene 5:  390–509 (0:13–0:17)
//   Scene 6:  510–629 (0:17–0:21)
//   Scene 7:  630–749 (0:21–0:25)
//   Scene 8:  750–839 (0:25–0:28)
//   Scene 9:  840–899 (0:28–0:30)

export const AIVideo = () => {
  return (
    <AbsoluteFill>
      <Sequence from={0} durationInFrames={90}>
        <Scene1 />
      </Sequence>
      <Sequence from={90} durationInFrames={90}>
        <Scene2 />
      </Sequence>
      <Sequence from={180} durationInFrames={90}>
        <Scene3 />
      </Sequence>
      <Sequence from={270} durationInFrames={120}>
        <Scene4 />
      </Sequence>
      <Sequence from={390} durationInFrames={120}>
        <Scene5 />
      </Sequence>
      <Sequence from={510} durationInFrames={120}>
        <Scene6 />
      </Sequence>
      <Sequence from={630} durationInFrames={120}>
        <Scene7 />
      </Sequence>
      <Sequence from={750} durationInFrames={90}>
        <Scene8 />
      </Sequence>
      <Sequence from={840} durationInFrames={60}>
        <Scene9 />
      </Sequence>
    </AbsoluteFill>
  );
};
