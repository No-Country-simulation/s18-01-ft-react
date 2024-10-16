import * as vscode from 'vscode';


let url: string | undefined;
let code: string | undefined;
let activityTimeout: NodeJS.Timeout | undefined;
let isInactive = false;

export function activate(context: vscode.ExtensionContext) {

	const setUrlAndCodigoCommand = vscode.commands.registerCommand('teclado-10.setUrlAndCodigo', async () => {
		url = await vscode.window.showInputBox({ prompt: 'Ingresa la URL' });
		if (!url) {
			vscode.window.showErrorMessage('No se ingresó una URL válida.');
			return;
		}

		code = await vscode.window.showInputBox({ prompt: 'Ingresa el código' });
		if (!code) {
			vscode.window.showErrorMessage('No se ingresó un código válido.');
			return;
		}

		vscode.window.showInformationMessage(`URL y Código establecidos: ${url}, ${code}`);
	});

	context.subscriptions.push(
		vscode.workspace.onDidChangeTextDocument(() => resetActivityTimer()),
		vscode.window.onDidChangeTextEditorSelection(() => resetActivityTimer()),
		vscode.window.onDidChangeActiveTextEditor(() => resetActivityTimer()),
		vscode.window.onDidChangeActiveTerminal(() => resetActivityTimer()),
		vscode.window.onDidChangeVisibleTextEditors(() => resetActivityTimer())
	);


	startActivityTimer();

	context.subscriptions.push(setUrlAndCodigoCommand);
}

function startActivityTimer() {
	activityTimeout = setTimeout(() => {
		if (url && code && !isInactive) {
			isInactive = true;
			sendRequest(url, code, { activity: 'inactivo' });
		}
	}, 1 * 60 * 1000); 
}

function resetActivityTimer() {
	if (isInactive && url && code) {
		isInactive = false;
		sendRequest(url, code, { activity: 'activo' });
	}

	if (activityTimeout) {
		clearTimeout(activityTimeout);
	}
	startActivityTimer(); 
}

function sendRequest(url: string, code: string, data: { activity: string }) {
	fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ code, ...data }),  
	})
		.then(response => {
			if (response.ok) {
				console.log('Solicitud enviada con éxito:', data);
			} else {
				console.error('Error en la solicitud:', response.statusText);
			}
		})
		.catch(error => {
			console.error('Error al enviar la solicitud:', error);
		});
}

export function deactivate() {
	if (activityTimeout) {
		clearTimeout(activityTimeout);
	}

	if (url && code) {
		sendRequest(url, code, { activity: 'desconectado' });
	}
}