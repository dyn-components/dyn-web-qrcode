import BaseComponent from "./BaseComponent";
import QRCode from 'qrcode';
class WebComponent extends BaseComponent {
	private _qrcodeText: string | QRCode.QRCodeSegment[] = '';
	private _qrcodeOptions: QRCode.QRCodeToStringOptions = {
		type: 'svg',
		errorCorrectionLevel: 'Q'
	};
	private rootContainer: HTMLDivElement;
	constructor() {
		super();

		let container = document.createElement("div");
		container.classList.add("dyn-component--web-components", "dyn-qrcode");
		this.shadowRoot!.appendChild(container);
		this.rootContainer = container;
	}
	// QRCodeToStringOptions
	set options(options: QRCode.QRCodeToStringOptions) {
		Object.assign(this._qrcodeOptions, options);
	}
	get options(): QRCode.QRCodeToStringOptions {
		return this._qrcodeOptions;
	}
	// text
	set text(text: string | QRCode.QRCodeSegment[]) {
		this._qrcodeText = text;
		if (this._isConnected) {
			this.renderQrcode();
		}
	}
	get text(): string | QRCode.QRCodeSegment[] {
		return this._qrcodeText || this.getAttribute('text') || '';
	}
	get QRCodeClass() {
		return QRCode;
	}

	connectedCallback() {
		super.connectedCallback();

		if (this.text) {
			this.renderQrcode();
		}
	}


	private renderQrcode() {
		QRCode.toString(this.text, this.options, (err: any, dataURL: string) => {
			if (err) {
				return console.error(err)
			}
			console.log(123, dataURL)
			this.rootContainer.innerHTML = dataURL;
		})
	}
}

const define = (name: string, options?: ElementDefinitionOptions) => {
	if (!customElements.get(name)) {
		customElements.define(name, WebComponent, options);
	}
};

export { define };
export default WebComponent;
