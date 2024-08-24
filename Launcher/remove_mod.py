import os
import shutil
from configparser import ConfigParser


def loadConfig():
    config = ConfigParser()
    config.read("config.ini")
    try:
        game_paks_directory = config.get("CONFIG", "game_paks_directory").strip('"')
        mod_directory = config.get("CONFIG", "mod_directory").strip('"')
        return game_paks_directory, mod_directory
    except Exception as e:
        print(f"Error reading config: {e}")
        return None, None


def deleteModDirectory(game_paks_directory, mod_directory):
    try:
        if not game_paks_directory or not mod_directory:
            print("Invalid directories specified in config.")
            return

        mod_folder_path = os.path.join(
            game_paks_directory, os.path.basename(mod_directory)
        )

        if os.path.exists(mod_folder_path):
            shutil.rmtree(mod_folder_path)
            print(f"Mod has been deleted.")
        else:
            print(f"Mod does not exist.")
    except Exception as e:
        print(f"Error deleting mod directory: {e}")


def main():
    game_paks_directory, mod_directory = loadConfig()
    deleteModDirectory(game_paks_directory, mod_directory)

    # Wait for user input before closing
    input("Press Enter to exit...")


if __name__ == "__main__":
    main()
