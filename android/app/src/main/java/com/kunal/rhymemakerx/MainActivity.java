package com.kunal.rhymemakerx;

import android.app.Activity;
import android.content.Intent;
import android.speech.RecognizerIntent;
import android.widget.Toast;

import com.wmjmc.reactspeech.VoiceModule;
import com.facebook.react.bridge.*;
import com.facebook.react.modules.core.*;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactRootView;

import com.facebook.react.ReactActivity;
import android.content.pm.PackageManager;
import android.os.Bundle;
import java.io.*;
import java.util.*;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */

    @Override
    protected String getMainComponentName() {
        return "RhymeMaker";
    }

    @Override
    public void onNewIntent (Intent intent) {
        super.onNewIntent(intent);
        setIntent(intent);
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode,resultCode,data);
        switch(requestCode){
            case 101:handleSpeechRecognitionIntent(resultCode,data);break;
        }
    }

    public void handleSpeechRecognitionIntent(int resultCode, Intent data) {
        switch (resultCode){
            case Activity.RESULT_OK:
                try{
                        ReactContext reactContext = getReactNativeHost().getReactInstanceManager().getCurrentReactContext();
                        ArrayList<String> result = data.getStringArrayListExtra(RecognizerIntent.EXTRA_RESULTS);
                        WritableMap params = Arguments.createMap();
                        params.putString("word", result.get(0).toString());
                        reactContext
                            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                            .emit("voiceInputRecieved", params);
                    }
                    catch(Exception ex){
                        makeToast("Please try again");
                    }
                break;
            case Activity.RESULT_CANCELED:break;

            case RecognizerIntent.RESULT_AUDIO_ERROR:makeToast("Audio Error");break;

            case RecognizerIntent.RESULT_NETWORK_ERROR:makeToast("Network Error");break;
            
            case RecognizerIntent.RESULT_NO_MATCH:makeToast("Pardon? Couldn't understand that.");break;
            
            case RecognizerIntent.RESULT_SERVER_ERROR:makeToast("Server Error");break;
        }
    }

    public void makeToast(String text){
        Toast.makeText(getApplicationContext(),text, Toast.LENGTH_SHORT).show();
    }
        
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }
}
