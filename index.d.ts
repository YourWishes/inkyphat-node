import inkyphat from "./lib/inkyphat";
import { Gpio } from 'onoff';

declare module "inkyphat" {
  type InkyColorList = {
    WHITE: 0,
    BLACK: 1,
    RED: 2,
    LIGHT_RED: 3
  }
  type InkyColor = InkyColorList[keyof InkyColorList];

  type InkyDrawModes = {
    pimoroni: 'p',
    quick: 'q',
    noFlash: 'nf',
    clear: '_'
  }
  type InkyDrawMode = keyof InkyDrawModes;

  type InkyControllerFactoryOptions = {
    spiDevice?:string;
    Gpio?:Gpio;
    Spi?:piSpi;
    logger?:any;
  }
  type InkyControllerFactory = (options:InkyControllerFactoryOptions) => any

  type InkyPHATOptions = {
    ControllerFactory:InkyControllerFactory,
    logToStd:boolean,
    logToConsole:boolean,
    debugLogging:boolean,
    mode:InkyDrawMode,
    border:InkyColor
  }

  type InkyInstance = InkyColorList & {
    init:(p?:{ spiDevice:string })=>Promise<void>;
    destroy:() => Promise<void>;
    redraw:(useMode?:DrawMode) => Promise<void>;
    clearScreen:()=>Promise<void>;
    clearBuffer:()=>void;
    drawRect:(x1:number, y1:number, x2:number, y2:number, color:InkyColor)=>void;
    setPixel:(x:number,y:number,color:InkyColor)=>void;
    setBorder:(color:InkyColor)=>void;
    getWidth:()=>number;
    getHeight:()=>number;
    getModes:()=>InkyDrawMode[];
    setMode:(newMode:InkyDrawMode)=>void
  }

  function initInkyPHAT(options?:InkyPHATOptions):InkyInstance;

  export = initInkyPHAT;
}
