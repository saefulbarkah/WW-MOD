import os
import shutil
from configparser import ConfigParser
from typing import TypedDict

filter_file_deleted = [
    "wicked-waifus-win-os_live_1_4_0-only-sig-bypass.dll",
    "libraries.txt",
    "winhttp.dll",
]

config = ConfigParser()


class loadTyped(TypedDict):
    game_paks_directory: str
    mod_directory: str
    game_executable_path: str
    bypass_sig_dir: str
    hotpatch_dir: str
    binaries_dir: str
    game_dir: str


def loadConfig() -> loadTyped:
    config.read("config.ini")
    try:
        game_paks_directory = config.get("CONFIG", "game_paks_directory").strip('"')
        mod_directory = config.get("CONFIG", "mod_directory").strip('"')
        game_executable_path = config.get("CONFIG", "game_executable_path").strip('"')
        bypass_sig_dir = config.get("CONFIG", "bypass_sig_dir").strip('"')
        hotpatch_dir = config.get("CONFIG", "hotpatch_dir").strip('"')
        binaries_dir = config.get("CONFIG", "binaries_dir").strip('"')
        game_dir = config.get("CONFIG", "game_dir").strip('"')
        return {
            "game_paks_directory": game_paks_directory,
            "mod_directory": mod_directory,
            "game_executable_path": game_executable_path,
            "bypass_sig_dir": bypass_sig_dir,
            "hotpatch_dir": hotpatch_dir,
            "binaries_dir": binaries_dir,
            "game_dir": game_dir,
        }
    except Exception as e:
        print(f"Error reading config: {e}")
        return None, None, None


def deleteModDirectory(pathDir: str, mod_dir: str):
    try:
        mod_folder_path = os.path.join(pathDir, os.path.basename(mod_dir))
        if os.path.exists(mod_folder_path):
            shutil.rmtree(mod_folder_path)
            # print(f"Mod has been deleted.")
        else:
            print(f"Mod does not exist.")
    except Exception as e:
        print(f"Error deleting mod directory: {e}")


def delete_files_from_list(path, file_list):
    for filename in file_list:
        file_path = os.path.join(path, filename)  # Combine path and filename

        try:
            if os.path.isfile(file_path):  # Check if it's a file
                os.remove(file_path)  # Delete the file
                # print(f"File mod has been deleted.")
            else:
                print(f"'{file_path}' is not a file or does not exist.")
        except Exception as e:
            print(f"Error deleting file '{file_path}': {e}")


def main():
    config = loadConfig()
    game_pak_dir = config["game_paks_directory"]
    binaries_dir = config["binaries_dir"]
    game_dir = config["game_dir"]
    deleteModDirectory(game_dir, "Mod")
    deleteModDirectory(game_pak_dir, "~mods")
    delete_files_from_list(binaries_dir, filter_file_deleted)

    # Wait for user input before closing
    input("Press Enter to exit...")


if __name__ == "__main__":
    main()
