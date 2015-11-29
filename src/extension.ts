import * as vscode from 'vscode';

class MDShortcuts {
    static bold(t: string): string {
        return "**" + t + "**";
    }

    static italics(t: string): string {
        return "*" + t + "*";
    }

    static heading(t: string, n: number): string {
        var s = "";
        for (var i = 0; i < n; i++) {
            s += "#";
        }

        return s + t;
    }

    static hyperlink(t: string, l: string): string {
        // [text](link)
        return "[" + t + "](" + l + ")";
    }

    static image(t: string, url: string): string {
        //![alt text](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 1")
        return "![" + t + "](" + url + " " + t + ")";
    }

    static codeblocks(t: string): string {
        return "```" + t + "```";
    }
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('MD shortcuts plugin active.');

    var bold = vscode.commands.registerTextEditorCommand('md.bold', (t, te) => {
        te.replace(t.selection, MDShortcuts.bold(t.document.getText(t.selection)));
    });

    var italics = vscode.commands.registerTextEditorCommand('md.italics', (t, te) => {
        te.replace(t.selection, MDShortcuts.italics(t.document.getText(t.selection)));
    });

    var h1 = vscode.commands.registerTextEditorCommand('md.h1', (t, te) => {
        te.replace(t.selection, MDShortcuts.heading(t.document.getText(t.selection), 1));
    });

    var h2 = vscode.commands.registerTextEditorCommand('md.h2', (t, te) => {
        te.replace(t.selection, MDShortcuts.heading(t.document.getText(t.selection), 2));
    });

    var h3 = vscode.commands.registerTextEditorCommand('md.h3', (t, te) => {
        te.replace(t.selection, MDShortcuts.heading(t.document.getText(t.selection), 3));
    });

    var hyperlink = vscode.commands.registerTextEditorCommand('md.hyperlink', () => {
        let t = vscode.window.activeTextEditor;
        vscode.window.showInputBox({
            placeHolder: "Enter URL"
        }).then((v) => {
            if (v != undefined && v != "") {
                t.edit((te) => {
                    te.replace(t.selection, MDShortcuts.hyperlink(t.document.getText(t.selection), v));
                });
            }
        });
    });

    var image = vscode.commands.registerTextEditorCommand('md.image', () => {
        let t = vscode.window.activeTextEditor;
        vscode.window.showInputBox({
            placeHolder: "Enter image url"
        }).then((v) => {
            if (v != undefined && v != "") {
                t.edit((te) => {
                    te.replace(t.selection, MDShortcuts.image(t.document.getText(t.selection), v));
                });
            }
        });
    });

    var codeblocks = vscode.commands.registerTextEditorCommand('md.codeblocks', (t, te) => {
        te.replace(t.selection, MDShortcuts.codeblocks(t.document.getText(t.selection)));
    });

    [bold, italics, h1, h2, h3, hyperlink, image, codeblocks].forEach(t => {
        context.subscriptions.push(t);
    });
}
