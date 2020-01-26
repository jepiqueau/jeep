#import <Foundation/Foundation.h>
#import <Capacitor/Capacitor.h>

// Define the plugin using the CAP_PLUGIN Macro, and
// each method the plugin supports using the CAP_PLUGIN_METHOD macro.
 
CAP_PLUGIN(CapacitorDataStorageSqlite, "CapacitorDataStorageSqlite",
           CAP_PLUGIN_METHOD(echo, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(openStore, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(setTable, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(set, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(get, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(remove, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(clear, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(keys, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(values, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(keysvalues, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(iskey, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(deleteStore,CAPPluginReturnPromise);
)
CAP_PLUGIN(CapacitorVideoPlayer, "CapacitorVideoPlayer",
           CAP_PLUGIN_METHOD(initPlayer, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(play, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(pause, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(getDuration, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(getCurrentTime, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(setCurrentTime, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(getVolume, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(setVolume, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(getMuted, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(setMuted, CAPPluginReturnPromise);
)
CAP_PLUGIN(CapacitorSQLite, "CapacitorSQLite",
           CAP_PLUGIN_METHOD(echo, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(open, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(close, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(execute, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(run, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(query, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(deleteDatabase,CAPPluginReturnPromise);
)
