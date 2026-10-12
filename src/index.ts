import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { IThemeManager } from '@jupyterlab/apputils';

/**
 * Initialization data for the jh-vantage-theme extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'jh-vantage-theme:plugin',
  description: 'Vantage Compute theme for JupyterLab',
  autoStart: true,
  requires: [IThemeManager],
  activate: (app: JupyterFrontEnd, manager: IThemeManager) => {
    console.log('JupyterLab extension jh-vantage-theme is activated!');
    const style = 'jh-vantage-theme/index.css';

    manager.register({
      name: 'jh-vantage-theme',
      isLight: true,
      load: () => manager.loadCSS(style),
      unload: () => Promise.resolve(undefined)
    });
  }
};

export default plugin;
