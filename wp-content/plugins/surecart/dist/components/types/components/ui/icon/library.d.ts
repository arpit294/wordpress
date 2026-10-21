import { IconLibrary, IconLibraryOptions, IconLibraryMutator, IconLibraryResolver } from '../../../types';
export type { IconLibrary, IconLibraryOptions, IconLibraryMutator, IconLibraryResolver };
interface WatchedIcon {
    library: string;
    redraw: () => void;
}
export declare function watchIcon(icon: WatchedIcon): void;
export declare function unwatchIcon(icon: WatchedIcon): void;
export declare function getIconLibrary(name?: string): IconLibrary | undefined;
export declare function registerIconLibrary(name: string, options: IconLibraryOptions): void;
export declare function unregisterIconLibrary(name: string): void;
