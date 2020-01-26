//
//  DatabaseSQLite.swift
//  Plugin
//
//  Created by  Quéau Jean Pierre on 23/01/2020.
//  Copyright © 2020 Max Lynch. All rights reserved.
//

import Foundation
import Capacitor
import SQLCipher

@objc(CapacitorSQLite)
public class CapacitorSQLite: CAPPlugin {
    var mDb: DatabaseHelper?
    var globalData: GlobalSQLite = GlobalSQLite()

    @objc func echo(_ call: CAPPluginCall) {
        let value = call.getString("value") ?? ""
        call.success([
            "value": value
        ])
    }
    @objc func open(_ call: CAPPluginCall) {
        guard let dbName = call.options["database"] as? String else {
            call.reject("Must provide a database name")
            return
        }
        let encrypted = call.options["encrypted"] as? Bool ?? false
        var inMode: String = ""
        var secretKey:String = ""
        var newsecretKey: String = ""
        if encrypted {
            inMode = call.options["mode"] as? String ?? "no-encryption"
            if inMode != "no-encryption" && inMode != "encryption" && inMode != "secret" && inMode != "newsecret" && inMode != "wrongsecret" {
                call.resolve([
                    "result": false,
                    "message": "OpenStore: Error inMode must be in ['encryption','secret','newsecret'])"
                ])
            }
            if inMode == "encryption" || inMode == "secret" {
                secretKey = globalData.secret
            } else if inMode == "newsecret" {
                secretKey = globalData.secret
                newsecretKey = globalData.newsecret
                globalData.secret = newsecretKey
            } else if inMode == "wrongsecret" {
                secretKey = "wrongsecret"
                inMode = "secret"
            } else {
                secretKey = ""
                newsecretKey = ""
            }
        } else {
            inMode = "no-encryption"
        }
        
        print("in openStore: dbName \(dbName)")
        print("in openStore: encrypted \(encrypted)")
        print("in openStore: mode \(inMode)")

        /* !!!! TODO encrypted and mode */
        do {
           mDb = try DatabaseHelper(databaseName:"\(dbName)SQLite.db", encrypted: encrypted, mode: inMode, secret:secretKey,newsecret:newsecretKey)
        } catch let error {
            call.resolve([
                "result": false,
                "message": "Error: \(error)"
            ])
        }
        if !mDb!.isOpen {
            call.resolve([
                "result": false
            ])
        } else {
            call.resolve([
                "result": true
            ])
        }
    }
    
    @objc func close(_ call: CAPPluginCall) {
        guard let dbName = call.options["database"] as? String else {
            call.reject("Must provide a database name")
            return
        }
        if(mDb != nil) {
            do {
                let res: Bool? = try (mDb?.close(databaseName:"\(dbName)SQLite.db"))
                call.success([
                    "result": res!
                ])
            } catch DatabaseHelperError.dbConnection(let message) {
                call.reject("\(message)")
            } catch DatabaseHelperError.close(let message){
                call.reject("Execute command failed \(message)")
            } catch {
                call.reject("Unexpected error: \(error).")
            }

        } else {
           call.reject("No database connection")
        }
    }
    
    @objc func execute(_ call: CAPPluginCall) {
        guard let statements = call.options["statements"] as? String else {
            call.reject("Must provide raw SQL statements")
            return
        }
        if(mDb != nil) {
            do {
                let res: Int? = try (mDb?.execSQL(sql:statements))
                call.success([
                    "changes": res!
                ])
            } catch DatabaseHelperError.dbConnection(let message) {
                call.reject("\(message)")
            } catch DatabaseHelperError.execSql(let message){
                call.reject("Execute command failed \(message)")
            } catch {
                call.reject("Unexpected error: \(error).")
            }

        } else {
           call.reject("No database connection")
        }
    }
    
    @objc func run(_ call: CAPPluginCall) {
        guard let statement = call.options["statement"] as? String else {
            call.reject("Must provide a SQL statement")
            return
        }
        guard let values = call.options["values"] as? Array<Any> else {
            call.reject("Values should be an Array of value")
            return
        }
        if(mDb != nil) {
            do {
                var res: Int?
                if(values.count > 0 ) {
                    var val: Array<Any> = []
                    for value in values {
                        if let obj = value as? String {
                            let str: String = "\(String(describing: obj))"
                            val.append(str)
                        } else if let obj = value as? Int {
                            val.append(obj)
                        } else if let obj = value as? Float {
                            val.append(obj)
                        } else if let obj = value as? Blob {
                            val.append(obj)
                        } else {
                            call.reject("Not a SQL type")
                        }
                    }
                     res = try (mDb?.runSQL(sql:statement,values: val))
                } else {
                    res = try (mDb?.runSQL(sql:statement,values: []))
                }
                call.success([
                    "changes": res!
                ])
            } catch DatabaseHelperError.dbConnection(let message) {
                call.reject("\(message)")
            } catch DatabaseHelperError.runSql(let message) {
                call.reject("run command failed \(message)")
            } catch {
                call.reject("Unexpected error: \(error).")
            }

        } else {
           call.reject("No database connection")
        }
    }
    
    @objc func query(_ call: CAPPluginCall) {
        guard let statement = call.options["statement"] as? String else {
            call.reject("Must provide a query statement")
            return
        }
        guard let values = call.options["values"] as? Array<String> else {
            call.reject("Values should be an Array of string")
            return
        }
        if(mDb != nil) {
            let res:Array<[String: Any]>
            do {
                if(values.count > 0) {
                    res = try (mDb?.selectSQL(sql:statement,values:values))!;
                } else {
                    res = try (mDb?.selectSQL(sql:statement,values:[]))!;
                }
                call.success([
                    "values": res
                ])
            } catch DatabaseHelperError.dbConnection(let message) {
                call.reject("\(message)")
            } catch DatabaseHelperError.selectSql(let message) {
                    call.reject("query command failed \(message)")
            } catch {
                call.reject("Unexpected error: \(error).")
            }

        } else {
           call.reject("No database connection")
        }

    }
    
    @objc func deleteDatabase(_ call: CAPPluginCall) {
        guard let dbName = call.options["database"] as? String else {
            call.reject("Must provide a database name")
            return
        }
        var res: Bool = false
        if mDb != nil {
            do {
                res = try (mDb?.deleteDB(databaseName:"\(dbName)SQLite.db"))!;
                if res {
                    call.success([
                        "result": true
                    ])
                } else {
                    call.success([
                        "result": false
                    ])
                }
            } catch DatabaseHelperError.deleteDB(let message) {
                call.reject("\(message)")
            } catch {
                call.reject("Unexpected error: \(error).");
            }
        } else {
            do {
                res = try UtilsSQLite.deleteFile(fileName: "\(dbName)SQLite.db")
                call.success([
                    "result": res
                ])
            } catch {
                call.reject("deleteDatabase: Error in deleting the database")
            }
                        
        }
    }
}
