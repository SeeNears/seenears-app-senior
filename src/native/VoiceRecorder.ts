import { NativeModules } from 'react-native';

type VoiceRecorderModule = {
  startRecording: () => Promise<string>;
  stopRecording: () => Promise<string>;
  cancelRecording: () => Promise<boolean>;
  getMaxAmplitude: () => Promise<number>;
};

const { VoiceRecorder } = NativeModules as {
  VoiceRecorder?: VoiceRecorderModule;
};

export default VoiceRecorder;
