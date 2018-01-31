var ns = namespace('Game.Foundation');

export default class ProviderRepository {

	/**
	 * Creates a new provider repository instance.
	 *
	 * @param  {Game.Contracts.Foundation.Application}  app
	 * @param  {Game.Filesystem.Filesystem}             files
	 * @param  {string}                                 manifestPath
	 *
	 * @return {this}
	 */
	constructor(app, files, manifestPath) {

		/**
		 * The application instance.
		 *
		 * @var {Game.Contracts.Foundation.Application}
		 */
		this._app = app;

		/**
		 * The filesystem instance.
		 *
		 * @var {Game.Filesystem.Filesystem}
		 */
		this._files = files;

		/**
		 * The path to the manifest file.
		 *
		 * @var {string}
		 */
		this._manifestPath = manifestPath;

	};

}

ns.ProviderRepository = ProviderRepository;