import React, {useRef, useState, useCallback} from 'react';
import tw, {styled} from 'twin.macro';
import HoverVideoPlayer from 'react-hover-video-player';

const Player = styled.div`
  ${tw`relative bg-cover bg-black cursor-pointer bg-no-repeat bg-center overflow-hidden`}

  ${({rounded}) => rounded && tw`rounded`};

  background-color: rgb(22, 24, 35);
  transform: translateZ(0px);
  -webkit-mask-image: -webkit-radial-gradient(
    center,
    circle cover,
    white 100%,
    black 100%
  );
`;

const VideoWrapper = styled.div`
  ${tw`relative`}
`;

const StyledIcon = styled.svg`
  ${tw`w-5 h-5`}
`;

const StyledButton = styled.button`
  ${tw`inline-flex items-center p-2 border border-transparent text-base leading-6 rounded-full text-white bg-black focus:outline-none focus:border-black transition ease-in-out duration-150`}
`;

const Controls = styled.div`
  ${tw`absolute top-0 left-0 z-50 p-3 hidden opacity-75 transition ease-in-out duration-150 group-hocus:block hover:opacity-100`}
`;

const UnmuteIcon = (
  <StyledIcon viewBox="0 0 24 24">
    <g fill="none">
      <path
        d="M17 9c.619.773 1 1.832 1 3s-.381 2.227-1 3m3-9c1.237 1.546 2 3.664 2 6s-.763 4.454-2 6M6.13 16.093l5.289 3.777A1 1 0 0 0 13 19.058V4.943a1 1 0 0 0-1.581-.814L6.13 7.907A.5.5 0 0 1 5.84 8H2a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h3.84a.5.5 0 0 1 .29.093z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </g>
  </StyledIcon>
);

const MuteIcon = (
  <StyledIcon viewBox="0 0 24 24">
    <g fill="none">
      <path
        d="M17.53 8.47a.75.75 0 1 0-1.06 1.06l1.06-1.06zm4.94 7.06a.75.75 0 1 0 1.06-1.06l-1.06 1.06zm1.06-6a.75.75 0 0 0-1.06-1.06l1.06 1.06zm-7.06 4.94a.75.75 0 1 0 1.06 1.06l-1.06-1.06zM6.13 16.093l-.436.61.436-.61zM5.84 8v-.75V8zm.29-.093l-.436-.61.436.61zM11.42 19.87l-.436.61.436-.61zm0-15.74l.436.61-.436-.61zM2 8v.75V8zm14.47 1.53l3 3 1.06-1.06-3-3-1.06 1.06zm3 3l3 3 1.06-1.06-3-3-1.06 1.06zm1.06 0l3-3-1.06-1.06-3 3 1.06 1.06zm-1.06-1.06l-3 3 1.06 1.06 3-3-1.06-1.06zm-7.22-6.527v14.114h1.5V4.943h-1.5zM1.75 15V9H.25v6h1.5zM2 8.75h3.84v-1.5H2v1.5zm4.566-.233l5.289-3.777-.872-1.22-5.289 3.777.872 1.22zm5.289 10.743l-5.289-3.777-.872 1.22 5.289 3.778.872-1.22zM5.84 15.25H2v1.5h3.84v-1.5zm.726.233a1.25 1.25 0 0 0-.726-.233v1.5a.25.25 0 0 1-.146-.047l.872-1.22zM5.84 8.75c.26 0 .514-.081.726-.233l-.872-1.22a.25.25 0 0 1 .146-.047v1.5zM.25 15c0 .966.784 1.75 1.75 1.75v-1.5a.25.25 0 0 1-.25-.25H.25zm12 4.057a.25.25 0 0 1-.395.203l-.872 1.22c1.158.828 2.767 0 2.767-1.423h-1.5zm1.5-14.114c0-1.423-1.609-2.251-2.767-1.424l.872 1.22a.25.25 0 0 1 .395.204h1.5zM1.75 9A.25.25 0 0 1 2 8.75v-1.5A1.75 1.75 0 0 0 .25 9h1.5z"
        fill="currentColor"
      />
    </g>
  </StyledIcon>
);

export function Video({
  sizingMode = 'overlay',
  autoplay = false,
  id,
  coverImg,
  videoUrl,
  onClick,
  rounded = true,
}) {
  const container = useRef(null);
  const [isVideoMuted, setIsVideoMuted] = useState(true);

  const toggleIsVideoMuted = useCallback(() => {
    setIsVideoMuted((isVideoMuted) => !isVideoMuted);
  }, []);

  const muteToggleMarkup = isVideoMuted ? MuteIcon : UnmuteIcon;

  return (
    <Player
      className="group"
      style={{
        position: 'relative',
        display: 'flex',
        width: '100%',
        height: '85%',
      }}
    >
      <VideoWrapper ref={container} onClick={onClick}>
        <HoverVideoPlayer
          key={id}
          focused={autoplay}
          videoSrc={videoUrl}
          preload="metadata"
          sizingMode={sizingMode}
          muted={isVideoMuted}
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
          }}
          videoStyle={{
            display: 'block',
            width: '100%',
            height: '100%',
          }}
          pausedOverlay={
            // eslint-disable-next-line jsx-a11y/alt-text
            <img src={coverImg} style={{ objectFit: "cover", width: '100%', height: '100%'}} />
          }
          hoverTargetRef={container}
          unloadVideoOnPaused
        />
      </VideoWrapper>
      <Controls>
        <StyledButton onClick={toggleIsVideoMuted} type="button">
          {muteToggleMarkup}
        </StyledButton>
      </Controls>
    </Player>
  );
}
