import os
import shutil
from tkinter import Tk
from tkinter.filedialog import askdirectory
from configparser import ConfigParser
import subprocess
import time
import requests
from typing import TypedDict


config = ConfigParser()

filter_file_deleted = [
    "ww-patch.dll",
    "libraries.txt",
    "winhttp.dll",
]


def check_internet_connection(url="https://www.google.com"):
    """Check if the internet connection is available by making a request to a URL."""
    try:
        response = requests.get(url, timeout=5)  # Set a timeout to avoid hanging
        if response.status_code == 200:
            return True  # Connection is successful
        else:
            return False  # Server response but not successful
    except requests.ConnectionError:
        return False  # No internet connection


def downloadResources():
    # Check for internet connection
    if not check_internet_connection():
        print("No internet connection. Please check your connection and try again.")
        return exit()  # Exit the function if no internet

    cfg = loadConfig()  # Assumed that loadConfig is defined elsewhere
    game_dir = os.path.join(cfg["game_dir"], "Mod/MaungMod/")
    loader_pak_directory = os.path.join(cfg["game_paks_directory"], "~mods")

    # Base raw URL for the repository
    base_url = "https://raw.githubusercontent.com/saefulbarkah/WW-MOD/main/pak/"

    # Construct URLs for the individual files
    maung_pak = os.path.join(base_url, "Mod/MaungMod/MaungMod.pak")
    tp_file_pak = os.path.join(base_url, "Mod/MaungMod/TPFile.pak")
    bypass_sig_pak = {
        "libaries": os.path.join(base_url, "bypass/libraries.txt"),
        "patch_fix": os.path.join(base_url, "bypass/ww-patch.dll"),
        "winhttp": os.path.join(base_url, "bypass/winhttp.dll"),
    }
    loader = os.path.join(base_url, "hotpatch/~mods/loader.pak")

    # List of files to download
    files_to_download = [maung_pak, tp_file_pak]
    files_to_download += list(bypass_sig_pak.values())  # Add bypass files
    files_to_download.append(loader)

    print("Downloading required files... Please wait.")

    # Download and save each file
    for file_url in files_to_download:
        response = requests.get(file_url)

        if response.status_code == 200:
            # Initialize `local_path` outside the if condition, ensuring it always has a value
            local_path = None  # Initialize the variable
            if file_url == maung_pak:
                local_path = os.path.join(game_dir, "MaungMod.pak")
            elif file_url == tp_file_pak:
                local_path = os.path.join(game_dir, "TPFile.pak")
            elif file_url in bypass_sig_pak.values():
                local_path = os.path.join(
                    cfg["binaries_dir"], os.path.basename(file_url)
                )
            elif file_url == loader:
                local_path = os.path.join(
                    loader_pak_directory, os.path.basename("~mods/loader.pak")
                )

            # Ensure local_path is properly assigned before proceeding
            if local_path:
                # Make sure the folder exists, or create it
                folder = os.path.dirname(local_path)
                if not os.path.exists(folder):
                    os.makedirs(folder)

                # Save the downloaded file locally
                with open(local_path, "wb") as f:
                    f.write(response.content)

            else:
                print(f"Error: No valid path found for {file_url}")
        else:
            print(f"Failed to download the file: {file_url}")
    print(f"Success!")


def checkConfigExists():
    return os.path.exists("config.ini")


def createDefaultConfig():
    if not checkConfigExists():
        config.add_section("CONFIG")
        config.set("CONFIG", "game_paks_directory", "")
        config.set("CONFIG", "game_executable_path", "")
        config.set("CONFIG", "binaries_dir", "")
        config.set("CONFIG", "game_dir", "")
        with open("config.ini", "w") as configFile:
            config.write(configFile)
        print("config.ini created with default settings.")


def saveGameDirectory():
    root = Tk()
    root.withdraw()
    path = askdirectory(title="Select Wuthering Wave Folder")
    if path:
        config.read("config.ini")
        if not config.has_section("CONFIG"):
            config.add_section("CONFIG")
        # Set game directory
        gamePaksPath = os.path.join(
            path, "Wuthering Waves Game", "Client", "Content", "Paks"
        )
        gameExecutablePath = os.path.join(
            path,
            "Wuthering Waves Game",
            "Client",
            "Binaries",
            "Win64",
        )
        binaries_path = os.path.join(
            path, "Wuthering Waves Game", "Client", "Binaries", "Win64"
        )
        game_dir = os.path.join(
            path,
            "Wuthering Waves Game",
        )
        config.set("CONFIG", "game_executable_path", gameExecutablePath)
        config.set("CONFIG", "game_paks_directory", gamePaksPath)
        config.set("CONFIG", "binaries_dir", binaries_path)
        config.set("CONFIG", "game_dir", game_dir)
        # Save config file
        with open("config.ini", "w") as configFile:
            config.write(configFile)
    root.quit()


def checkAndSaveConfig():
    createDefaultConfig()
    config.read("config.ini")

    if not config.has_section("CONFIG"):
        print("CONFIG section is missing, creating default config.")
        createDefaultConfig()

    if not config.has_option("CONFIG", "game_paks_directory"):
        print("Wuthering Waves not found, please select a directory.")
        saveGameDirectory()

    game_folder = config.get("CONFIG", "game_paks_directory").strip('"')

    if not game_folder:
        print("please select a Wuthering Wave directory.")
        saveGameDirectory()


class loadTyped(TypedDict):
    game_paks_directory: str
    game_executable_path: str
    binaries_dir: str
    game_dir: str


def loadConfig() -> loadTyped:
    config.read("config.ini")
    try:
        game_paks_directory = config.get("CONFIG", "game_paks_directory").strip('"')
        game_executable_path = config.get("CONFIG", "game_executable_path").strip('"')
        binaries_dir = config.get("CONFIG", "binaries_dir").strip('"')
        game_dir = config.get("CONFIG", "game_dir").strip('"')
        return {
            "game_paks_directory": game_paks_directory,
            "game_executable_path": game_executable_path,
            "binaries_dir": binaries_dir,
            "game_dir": game_dir,
        }
    except Exception as e:
        print(f"Error reading config: {e}")
        return None, None, None


def copyFolderToGameDirectory(target_directory, source_folder):
    target_folder = os.path.join(target_directory, os.path.basename(source_folder))
    try:
        if os.path.exists(target_folder):
            shutil.rmtree(target_folder)
        shutil.copytree(source_folder, target_folder)
        print(f"Folder '{source_folder}' successfully copied to '{target_folder}'.")
    except Exception as e:
        print(f"Error copying folder: {e}")


def copyFilesToGameDirectory(target_directory, source_folder):
    # Ensure target directory exists
    if not os.path.exists(target_directory):
        os.makedirs(target_directory)

    # Iterate over all files in the source folder
    try:
        for filename in os.listdir(source_folder):
            source_file = os.path.join(source_folder, filename)
            target_file = os.path.join(target_directory, filename)

            # Check if it's a file (and not a folder)
            if os.path.isfile(source_file):
                shutil.copy2(source_file, target_file)  # Use copy2 to preserve metadata
                print(f"File '{filename}' successfully copied to '{target_directory}'.")
            else:
                print(f"'{filename}' is not a file and was skipped.")
    except Exception as e:
        print(f"Error copying files: {e}")


def runExecutableAsAdmin(executable_path, args=""):
    try:
        # Format command with arguments
        command = f'"{executable_path}" {args}'

        # Start the process as admin
        process = subprocess.Popen(
            [executable_path] + args.split(),
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            shell=True,
            creationflags=subprocess.CREATE_NEW_CONSOLE,
            close_fds=True,
        )

        print("Game is running...")

        # Monitor process
        monitorProcess(process)

    except Exception as e:
        print(f"Error running executable: {e}")


def monitorProcess(process):
    try:
        while True:
            if process.poll() is not None:  # Check if the process has terminated
                print("Game has been closed.")
                break  # Exit the loop if the process has terminated

            time.sleep(5)  # Check every 5 seconds
    except KeyboardInterrupt:
        print("Stopping game due to interruption.")
        terminateProcess(process)


def terminateProcess(process):
    try:
        process.terminate()
        process.wait(timeout=5)
        print("Process terminated.")
    except subprocess.TimeoutExpired:
        print("Process did not terminate in time, killing...")
        process.kill()
        process.wait()
        print("Process killed.")


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


def runningGame():
    try:
        checkAndSaveConfig()
        config = loadConfig()
        game_pak_dir = config["game_paks_directory"]
        game_executable_path = config["game_executable_path"]
        binaries_dir = config["binaries_dir"]
        game_dir = config["game_dir"]

        if game_pak_dir:
            if os.path.exists(game_executable_path):
                downloadResources()
                welcome()
                # runExecutableAsAdmin(game_executable_path, "-fileopenlog") old
                runExecutableAsAdmin(
                    os.path.join(
                        game_executable_path,
                        "Client-Win64-Shipping.exe",
                    )
                )
                deleteModDirectory(game_dir, "Mod")
                deleteModDirectory(game_pak_dir, "~mods")
                delete_files_from_list(binaries_dir, filter_file_deleted)
                print("Cleaning.....")
            else:
                print(
                    f"Executable '{game_executable_path}' does not exist. Try to delete config.ini"
                )
        else:
            print("Invalid directories specified in config.")
    except Exception as e:
        print(f"Error in runningGame: {e}, try to delete config.ini")


def welcome():
    ascii_art = """

___  ___  ___  _   _ _   _ _____  ___  ______________ 
|  \\/  | / _ \\| | | | \\ | |  __ \\ |  \\/  |  _  |  _  \\
| .  . |/ /_\\ \\ | | |  \\| | |  \\/ | .  . | | | | | | |
| |\\/| ||  _  | | | | . ` | | __  | |\\/| | | | | | | |
| |  | || | | | |_| | |\\  | |_\\ \\ | |  | \\ \\_/ / |/ / 
\\_|  |_/_| |_/_\\___/\\_| \\_/\\____/ \\_|  |_/_\\___/|___/
                                                      
                                                      

                                         
"""
    print(ascii_art)


if __name__ == "__main__":
    runningGame()
