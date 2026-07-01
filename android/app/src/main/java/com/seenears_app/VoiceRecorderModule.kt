package com.seenears_app

import android.media.MediaRecorder
import android.os.Build
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import java.io.File

class VoiceRecorderModule(
  private val reactContext: ReactApplicationContext,
) : ReactContextBaseJavaModule(reactContext) {
  private var recorder: MediaRecorder? = null
  private var currentFilePath: String? = null

  override fun getName(): String = "VoiceRecorder"

  @ReactMethod
  fun startRecording(promise: Promise) {
    if (recorder != null) {
      promise.reject("recording_in_progress", "Recording is already in progress.")
      return
    }

    try {
      val outputFile = File(
        reactContext.cacheDir,
        "voice_record_${System.currentTimeMillis()}.m4a",
      )
      currentFilePath = outputFile.absolutePath

      recorder = createRecorder().apply {
        setAudioSource(MediaRecorder.AudioSource.MIC)
        setOutputFormat(MediaRecorder.OutputFormat.MPEG_4)
        setAudioEncoder(MediaRecorder.AudioEncoder.AAC)
        setOutputFile(outputFile.absolutePath)
        prepare()
        start()
      }

      promise.resolve(outputFile.absolutePath)
    } catch (error: Exception) {
      releaseRecorder()
      promise.reject("start_recording_failed", error)
    }
  }

  @ReactMethod
  fun stopRecording(promise: Promise) {
    val activeRecorder = recorder
    val outputPath = currentFilePath

    if (activeRecorder == null || outputPath == null) {
      promise.reject("recording_not_started", "Recording has not started.")
      return
    }

    try {
      activeRecorder.stop()
      promise.resolve(outputPath)
    } catch (error: Exception) {
      promise.reject("stop_recording_failed", error)
    } finally {
      releaseRecorder()
    }
  }

  @ReactMethod
  fun cancelRecording(promise: Promise) {
    val outputPath = currentFilePath

    try {
      recorder?.runCatching { stop() }
      if (outputPath != null) {
        File(outputPath).delete()
      }
      promise.resolve(true)
    } catch (error: Exception) {
      promise.reject("cancel_recording_failed", error)
    } finally {
      releaseRecorder()
    }
  }

  @ReactMethod
  fun getMaxAmplitude(promise: Promise) {
    try {
      promise.resolve(recorder?.maxAmplitude ?: 0)
    } catch (error: Exception) {
      promise.reject("amplitude_unavailable", error)
    }
  }

  private fun createRecorder(): MediaRecorder {
    return if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
      MediaRecorder(reactContext)
    } else {
      @Suppress("DEPRECATION")
      MediaRecorder()
    }
  }

  private fun releaseRecorder() {
    recorder?.release()
    recorder = null
    currentFilePath = null
  }
}
