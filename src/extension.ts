'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';


export function activate(context: vscode.ExtensionContext) {
    //  添加头注释
    let disposable = vscode.commands.registerCommand('extension.addHeadNote', () => {

        let editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }
        let strLast = initHeadTemple()
        var doc = editor.document;
        editor.edit((eb) => {
            eb.insert(doc.positionAt(0), strLast);
        });
    });

    //u3d entity
    let disposable2 = vscode.commands.registerCommand('extension.formatEntity', () => {

        let options1 = { prompt: "请输入类名", placeHolder: "请输入类名" };
        let options2 = { prompt: "请复制字段", placeHolder: "请复制字段" };

        vscode.window.showInputBox(options1).then(function (msg) {
            if (msg == 'undefined') {
                return;
            }
            if (typeof (msg) != 'string') {
                vscode.window.showWarningMessage('输入出错或中断，请重新输入1');
                return;
            }

            let editor = vscode.window.activeTextEditor;
            if (!editor) {
                return;
            }

            let className = msg.toString().trim()

            // 字段
            vscode.window.showInputBox(options2).then(function (msg) {
                if (msg == 'undefined') {
                    return;
                }
                if (typeof (msg) != 'string') {
                    vscode.window.showWarningMessage('输入出错或中断，请重新输入2');
                    return;
                }

                let editor = vscode.window.activeTextEditor;
                if (!editor) {
                    return;
                }

                let arr1 = msg.toString().trim().split("\t");
                let keyList = new Array();
                let valueList = new Array();

                for (var i = 0; i < arr1.length; i++) {
                    if (i % 2 == 0) {
                        keyList.push(arr1[i].toString().trim());
                    } else {
                        valueList.push(arr1[i].toString().trim());
                    }
                }

                if (keyList.length != valueList.length) {
                    vscode.window.showWarningMessage('keyList.length != valueList.length');
                    return;
                }

                let str = ''
                let strCtor = '';
                let strInit = '';
                let strClear = '';

                strCtor = 'unity.exports.' + className + '= class("' + className + '")  \n\n'
                strCtor = strCtor + 'function  ' + className + ':Ctor() \n'
                strCtor = strCtor + initParamsTemple(keyList, valueList)
                strCtor = strCtor + 'end'

                strInit = 'function ' + className + ':InitDate(data) \n';
                for (var i = 0; i < keyList.length; i++) {
                    strInit = strInit + '    self.' + keyList[i] + ' = data.' + keyList[i] + '          --' + valueList[i] + '\n';
                }
                strInit = strInit + 'end'

                strClear = 'function ' + className + ':Clear() \n';
                strClear = strClear + initParamsTemple(keyList, valueList)
                strClear = strClear + 'end'

                str = strCtor + '\n\n' + strInit + '\n\n' + strClear + '\n'
                var doc = editor.document;
                editor.edit((eb) => {
                    eb.insert(editor.selection.active, str);
                });
            });
        });

    });

    context.subscriptions.push(disposable);
    context.subscriptions.push(disposable2);
}

// this method is called when your extension is deactivated
export function deactivate() {
}

//init head temple 
function initHeadTemple() {
    // time
    let time = new Date()
    let year = time.getFullYear()
    let month = (time.getMonth() + 1) < 10 ? '0' + (time.getMonth() + 1) : (time.getMonth() + 1)
    let day = time.getDate() < 10 ? '0' + time.getDate() : time.getDate()
    let timeStr = year + '/' + month + '/' + day

    // Define header content
    var str1 = "--------------------------------------------------------";
    var str2 = "-- @des";
    var str3 = "-- @com  ©2017福州博翼互娱网络科技有限公司";
    var str4 = "-- @author 822LL";
    var str5 = "-- @time  " + timeStr;

    var strLast = str1 + '\n' + str2 + '\n' + str3 + '\n' + str4 + '\n' + str5 + '\n' + str1
    return strLast
}

//init entity temple   Ctor, Clear
function initParamsTemple(keyList, valueList) {
    let strLast = ''
    for (var i = 0; i < keyList.length; i++) {
        let strTemp = ''
        if (valueList[i].indexOf("string") > 0) {
            strTemp = ' = ""'
        } else {
            strTemp = ' = 0'
        }
        strLast = strLast + '    ' + keyList[i] + strTemp + '          --' + valueList[i] + '\n';
    }
    return strLast
}