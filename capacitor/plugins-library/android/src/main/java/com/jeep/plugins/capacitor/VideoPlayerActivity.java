package com.jeep.plugins.capacitor;
import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.media.MediaPlayer;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.net.Uri;
import android.util.Log;
import android.view.WindowManager;
import android.widget.MediaController;
import android.widget.VideoView;
import android.media.MediaPlayer.OnPreparedListener;

import com.jeep.plugins.capacitor.R;

public class VideoPlayerActivity  extends AppCompatActivity {
    private static final String TAG = "VideoPlayerActivity";
    VideoView videoView;
    MediaController mCtrl;

    // Current playback position (in milliseconds).
    private int mCurrentPosition = 0;

    // Tag for the instance state bundle.
    private static final String PLAYBACK_TIME = "play_time";


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_videoplayer);
        videoView = (VideoView) findViewById(R.id.videoViewId);

        // Get the Intent that started this activity and extract the string
        final Intent intent = getIntent();
        Uri url = intent.getParcelableExtra("videoUri");
        Log.v(TAG,"display url: "+url);
        if (url != null) {
            // set to Full Screen
            getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN,
                    WindowManager.LayoutParams.FLAG_FULLSCREEN);
            getSupportActionBar().hide();

            if (savedInstanceState != null) {
                mCurrentPosition = savedInstanceState.getInt(PLAYBACK_TIME);
            }

            // define a Media Controller
            mCtrl = new MediaController(this);
            //mCtrl.setMediaPlayer(videoView);
            mCtrl.setAnchorView(videoView);
            videoView.setMediaController(mCtrl);
            videoView.setVideoURI(url);
            videoView.setOnPreparedListener(new OnPreparedListener(){
                public void onPrepared(MediaPlayer mp) {
                    // Restore saved position, if available.
                    if (mCurrentPosition > 0) {
                        videoView.seekTo(mCurrentPosition);
                    } else {
                        // Skipping to 1 shows the first frame of the video.
                        videoView.seekTo(1);
                    }

                    videoView.start();
                }
            });
            videoView.setOnCompletionListener(new MediaPlayer.OnCompletionListener() {
                @Override
                public void onCompletion(MediaPlayer mediaPlayer) {
                    // On completion.
                    setResult(RESULT_OK, intent.putExtra("result", true));
                    videoView.seekTo(0);
                    finish();
                }
            });
        }
        else {
            setResult(RESULT_CANCELED, intent.putExtra("result", false));
            finish();
        }

    }
    @Override
    protected void onSaveInstanceState(Bundle outState) {
        super.onSaveInstanceState(outState);

        // Save the current playback position (in milliseconds) to the
        // instance state bundle.
        outState.putInt(PLAYBACK_TIME, videoView.getCurrentPosition());
    }

    @Override
    public void onBackPressed() {
        setResult(RESULT_CANCELED, getIntent().putExtra("result", false));
        finish();
    }
}