'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';



export function activate(context: vscode.ExtensionContext) {


    let disposable = vscode.commands.registerCommand('extension.addHeadNote', () => {


        let editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }

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

        // Get the document
        var doc = editor.document;

        // Insert header
        editor.edit((eb) => {
            eb.insert(doc.positionAt(0), strLast);
        });
    });

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}