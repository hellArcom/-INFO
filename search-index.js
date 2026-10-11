window.INFO_SEARCH_INDEX = [
 {
  "id": "cpu",
  "page": "processeurs.html",
  "hash": "",
  "title": "Processeurs",
  "titleEn": "Processors",
  "text": "Matériel · processeurs Nomenclature des processeurs Guide rapide pour décoder les références AMD Ryzen et Intel Core. Repérer génération, puissance et suffixes permet d’orienter un choix ou un diagnostic. # CPU # AMD # INTEL AMD Ryzen (bureau & portable) Élément Exemple Signification Gamme Ryzen 3 / 5 / 7 / 9 Niveau de performance global Génération 7xxx (ex. 7000) Architecture et génération Modèle xx80x Indique la puissance dans la gamme X Ryzen 7 7800X Modèle boosté X3D 7800X3D / 7950X3D Cache 3D V-Cache, très performant en jeu G 5600G / 7840HS G ? Graphique intégré performant F 5600F / 7700F Sans puce graphique intégrée HS / HX 7945HX Haute performance (PC portable) U 7730U Basse consommation (PC portable) Intel Core (bureau & portable) Élément Exemple Signification Gamme i3 / i5 / i7 / i9 Niveau de performance Génération 14xxx (ex. 14e gen) Génération du processeur Modèle xx70 Puissance au sein de la génération K 14700K Overclocking débloqué F 14400F Sans puce graphique intégrée KF 13700KF K + F combinés KS 14900KS Édition spéciale ultra-rapide T 12400T Basse consommation (PC fixe) H / HX 13900HX Haute performance (PC portable) U 1365U Basse consommation (PC portable)"
 },
 {
  "id": "commands",
  "page": "commandes.html",
  "hash": "",
  "title": "Commandes pratiques",
  "titleEn": "Practical commands",
  "text": "Terminal · commandes Commandes pratiques Référentiel de commandes utiles pour le technicien : réparation, diagnostic, maintenance Windows et Linux. # CMD # POWERSHELL # SHELL Commandes Windows (réparation & diagnostic) Commande Usage sfc /scannow Vérifie et restaure les fichiers système Windows. DISM /Online /Cleanup-Image /RestoreHealth Répare l’image système Windows. chkdsk C: /f /r Vérifie et corrige les erreurs du disque. systeminfo Affiche la configuration système complète. msconfig Configuration du démarrage et des services. msinfo32 Informations matérielles et logicielles détaillées. dxdiag Diagnostic DirectX (graphique/audio). eventvwr.msc Observateur d’événements Windows. Commandes Linux (équivalents & maintenance) Commande Usage lsblk Liste des disques et partitions. df -h Espace disque disponible/utilisé. free -h Mémoire vive et swap. lscpu Informations CPU. uname -a Version du noyau et architecture. journalctl -b Journal du démarrage courant. sudo apt update && sudo apt upgrade Mise à jour paquets (Debian/Ubuntu). Commandes utilitaires & pratiques Commande Usage ipconfig /all Configuration réseau Windows complète. ping 8.8.8.8 Test de connectivité Internet. tracert 8.8.8.8 / traceroute Chemin suivi vers une destination. nslookup Résolution DNS. netstat -ano Connexions réseau et processus. shutdown /r /t 0 Redémarrer immédiatement. shutdown /s /t 60 Éteindre avec délai."
 },
 {
  "id": "windows",
  "page": "windows.html",
  "hash": "",
  "title": "Menus Windows",
  "titleEn": "Windows menus",
  "text": "Menus Windows — //INFO // //INFO DOCUMENTATION INFORMATIQUE ☰ Menu ⌕ Recherche Accueil Logiciels Processeurs Commandes Windows BIOS / Boot Windows · dépannage Menus Windows & astuces technicien Accès rapides, environnements de récupération et petits raccourcis pour gagner du temps en intervention. # WINRE # MSConfig # Raccourcis Les menus de secours & d’administration Windows Raccourci / Outil Usage Win + X Menu rapide (Gestionnaire de tâches, Paramètres, Terminal, etc.) Win + R Exécuter une commande msconfig Démarrage sélectif, services, démarrage Windows regedit Éditeur du Registre (précaution requise) services.msc Services Windows diskmgmt.msc Gestion des disques devmgmt.msc Gestionnaire de périphériques compmgmt.msc Gestion de l’ordinateur Petits tips de technicien Safe mode : msconfig > Boot > Safe boot, or from WinRE > Advanced options.\"> Mode sans échec : msconfig > Démarrage > Démarrage sécurisé, ou depuis WinRE > Options avancées. Restore point : check it is enabled before heavy interventions.\"> Point de restauration : Vérifier avant interventions lourdes si activé. File History / Backup: always verify a backup exists before cloning/recovery.\"> Historique des fichiers / Sauvegarde : Toujours vérifier l’existence d’une sauvegarde avant clonage/récupération. BitLocker encryption : ask for the recovery key before any disk action.\"> Chiffrement BitLocker : Demander la clé de récupération avant toute action sur disque. //INFO · WINDOWS Retour à l'accueil"
 },
 {
  "id": "bios",
  "page": "bios.html",
  "hash": "",
  "title": "BIOS / Boot Menu",
  "titleEn": "BIOS / Boot Menu",
  "text": "BIOS / Boot Menu — //INFO // //INFO DOCUMENTATION INFORMATIQUE ☰ Menu ⌕ Recherche Accueil Logiciels Processeurs Commandes Windows BIOS / Boot Démarrage · firmware Touches BIOS / UEFI & menus de démarrage Raccourcis pour accéder au BIOS/UEFI ou au boot menu selon les constructeurs. Toujours adapter au modèle exact. # UEFI # BOOT # SECURE BOOT Accès au BIOS / UEFI (entrée firmware) Constructeur Touche(s) Remarques ASUS Suppr / F2 Selon modèle desktop/portable MSI Suppr Souvent DEL pour le BIOS Gigabyte / AORUS Suppr / F2 Varie selon cartes mères ASRock Suppr / F2 Commun Lenovo (ThinkPad) Enter + F1 / Novo Bouton Novo ou Fn+Enter selon modèle HP Esc / F10 Pour accéder aux options Dell F2 Setup BIOS/UEFI Acer Suppr / F2 Selon série Menu de démarrage (Boot Menu) Constructeur Touche ASUS Esc / F8 MSI F11 Gigabyte F12 ASRock F11 Lenovo F12 / Novo HP F9 Dell F12 Acer F12 Vérifications rapides Boot Order : check the boot order (USB/SSD/HDD).\"> Boot Order : vérifier l’ordre de démarrage (USB/SSD/HDD). Secure Boot : can block some unsigned live USBs.\"> Secure Boot : peut bloquer certains Live USB non signés. CSM / Legacy : enable only if needed for old media.\"> CSM / Legacy : à activer uniquement si nécessaire pour vieux supports. UEFI vs Legacy : prefer UEFI if Windows 10/11 is installed in UEFI mode.\"> UEFI vs Legacy : privilégier UEFI si Windows 10/11 installé en UEFI. Astuce — Shift + Restart to reach advanced options.\">si le PC démarre trop vite, utiliser WinRE ou redémarrer en maintenant Shift + Redémarrer pour accéder aux options avancées. //INFO · BIOS / BOOT Retour à l'accueil"
 },
 {
  "id": "tools",
  "page": "logiciels.html",
  "hash": "",
  "title": "Tous les logiciels",
  "titleEn": "All software",
  "text": "Logiciels technicien — //INFO // //INFO DOCUMENTATION INFORMATIQUE ☰ Menu ⌕ Recherche Accueil Logiciels Processeurs Commandes Windows BIOS / Boot Boîte à outils · logiciels Outils du technicien Sélection de logiciels gratuits, libres ou disposant d’une version gratuite pour préparer des supports, diagnostiquer et dépanner un ordinateur. Les liens mènent aux éditeurs ou projets officiels. # OUTILS # DIAGNOSTIC # SOURCES OFFICIELLES Environnements bootables et clés USB Logiciel Licence Usage principal Site officiel Ventoy Open source Créer une clé USB multiboot à partir d’images ISO. ventoy.net MediCat Gratuit Environnement de secours tout-en-un (WinPE). medicatusb.com Rescuezilla Open source Sauvegarde et clonage de disque en Live USB. rescuezilla.com Diagnostic et stabilité matérielle Logiciel Licence Usage principal Site officiel OCCT Gratuit (usage personnel) Tests de charge CPU, GPU, mémoire et alimentation. occtbase.com HWMonitor Gratuit Surveillance des températures et tensions. cpuid.com CPU-Z & GPU-Z Gratuit Identification des composants et de leurs fréquences. cpuid.com CrystalDiskInfo Gratuit Consultation de l’état SMART des disques. crystalmark.info Keyboard Tester Gratuit Tester le fonctionnement des touches du clavier. passmark.com Dead Pixel Locator Gratuit Rechercher les pixels morts ou bloqués. displaytester.com MemTest86+ Open source Test de fiabilité de la mémoire au démarrage. memtest.org Nettoyage, désinfection et optimisation Logiciel Licence Usage principal Site officiel BleachBit Open source Nettoyage de fichiers temporaires et caches. bleachbit.org Revo Uninstaller Gratuit (version limitée) Désinstallation et suppression des restes de programmes. revouninstaller.com BCUninstaller Open source Désinstallation par lots de logiciels et bloatwares. bcuninstaller.com AdwCleaner Gratuit Détection et suppression d’adwares et PUPs. malwarebytes.com Malwarebytes Free Gratuit Analyse et suppression de logiciels malveillants. malwarebytes.com O&O ShutUp10++ Gratuit Gestion de paramètres de confidentialité Windows 10/11. oo-software.com Recherche, système et registre Logiciel Licence Usage principal Site officiel Filelight Open source Visualiser graphiquement l’espace disque occupé. apps.kde.org Everything Gratuit Recherche instantanée de fichiers sous Windows. voidtools.com System Informer Open source Gestionnaire avancé de processus Windows. systeminformer.com LockHunter Gratuit Identifier les processus qui verrouillent un fichier. lockhunter.com TrID Gratuit Identifier le type d’un fichier sans extension. mark0.net Drivers et réseau Logiciel Licence Usage principal Site officiel Display Driver Uninstaller (DDU) Gratuit Nettoyage des pilotes graphiques. wagnardsoft.com Snappy Driver Installer Origin Open source Installation de pilotes, y compris hors ligne. sdi-tool.org Advanced IP Scanner Gratuit Analyse du réseau local. advanced-ip-scanner.com Nmap / Zenmap Open source Analyse de ports et audit réseau autorisé. nmap.org NetSpot / Wi-Fi Commander Gratuit (versions limitées) Analyse et cartographie du signal Wi-Fi. netspotapp.com Mots de passe et restauration Logiciel Licence Usage principal Site officiel Reset Windows Password Payant / selon édition Récupération d’accès Windows ; à utiliser uniquement avec autorisation. top-password.com chntpw / NTPWEdit Open source / gratuit Outils hors ligne autour des comptes Windows : n’utiliser que sur un appareil autorisé. projet chntpw Sauvegarde, clonage et récupération Logiciel Licence Usage principal Site officiel Clonezilla Open source Clonage et imagerie de disque. clonezilla.org TestDisk & PhotoRec Open source Récupération de partitions et de fichiers supprimés. cgsecurity.org FastCopy Gratuit / open source Copie rapide de données sous Windows. fastcopy.jp Kopia / Duplicati Open source Sauvegardes chiffrées et incrémentielles. kopia.io · duplicati.com Réseau et téléassistance Logiciel Licence Usage principal Site officiel RustDesk Open source Prise en main à distance. rustdesk.com AnyDesk Gratuit (usage personnel) Logiciel de téléassistance à distance. anydesk.com AnyViewer Gratuit (version personnelle) Logiciel de téléassistance. anyviewer.com Firefox Portable Open source Navigateur autonome pour support USB. portableapps.com Archives, automatisation et bureautique Logiciel Licence Usage principal Site officiel 7-Zip Open source Gestionnaire d’archives. 7-zip.org Ninite Gratuit Installation automatisée de logiciels Windows. ninite.com WinGet Gratuit / intégré à Windows Gestionnaire de paquets Windows. Microsoft Learn Sumatra PDF Open source Lecteur PDF léger. sumatrapdfreader.org LibreOffice Open source Suite bureautique libre. libreoffice.org Rufus Open source Création de clés USB bootables Windows et Linux. rufus.ie Aucun résultat ne correspond à cette recherche. //INFO · BOÎTE À OUTILS Retour à l'accueil"
 },
 {
  "id": "tool-usb",
  "page": "logiciels.html",
  "hash": "environnements-bootables",
  "title": "Clés USB & secours",
  "titleEn": "USB sticks & rescue",
  "text": "id=\"environnements-bootables\" data-search-group data-en=\"Bootable environments and USB drives\">Environnements bootables et clés USB Logiciel Licence Usage principal Site officiel Ventoy Open source Créer une clé USB multiboot à partir d’images ISO. ventoy.net MediCat Gratuit Environnement de secours tout-en-un (WinPE). medicatusb.com Rescuezilla Open source Sauvegarde et clonage de disque en Live USB. rescuezilla.com Diagnostic et stabilité matérielle Logiciel Licence Usage principal Site officiel OCCT Gratuit (usage personnel) Tests de charge CPU, GPU, mémoire et alimentation. occtbase.com HWMonitor Gratuit Surveillance des températures et tensions. cpuid.com CPU-Z & GPU-Z Gratuit Identification des composants et de leurs fréquences. cpuid.com CrystalDiskInfo Gratuit Consultation de l’état SMART des disques. crystalmark.info Keyboard Tester Gratuit Tester le fonctionnement des touches du clavier. passmark.com Dead Pixel Locator Gratuit Rechercher les pixels morts ou bloqués. displaytester.com MemTest86+ Open source Test de fiabilité de la mémoire au démarrage. memtest.org"
 },
 {
  "id": "tool-hardware",
  "page": "logiciels.html",
  "hash": "diagnostic-materiel",
  "title": "Diagnostic matériel",
  "titleEn": "Hardware diagnostics",
  "text": "id=\"diagnostic-materiel\" data-search-group data-en=\"Hardware diagnostics and stability\">Diagnostic et stabilité matérielle Logiciel Licence Usage principal Site officiel OCCT Gratuit (usage personnel) Tests de charge CPU, GPU, mémoire et alimentation. occtbase.com HWMonitor Gratuit Surveillance des températures et tensions. cpuid.com CPU-Z & GPU-Z Gratuit Identification des composants et de leurs fréquences. cpuid.com CrystalDiskInfo Gratuit Consultation de l’état SMART des disques. crystalmark.info Keyboard Tester Gratuit Tester le fonctionnement des touches du clavier. passmark.com Dead Pixel Locator Gratuit Rechercher les pixels morts ou bloqués. displaytester.com MemTest86+ Open source Test de fiabilité de la mémoire au démarrage. memtest.org Nettoyage, désinfection et optimisation Logiciel Licence Usage principal Site officiel BleachBit Open source Nettoyage de fichiers temporaires et caches. bleachbit.org Revo Uninstaller Gratuit (version limitée) Désinstallation et suppression des restes de programmes. revouninstaller.com BCUninstaller Open source Désinstallation par lots de logiciels et bloatwares. bcuninstaller.com AdwCleaner Gratuit Détection et suppression d’adwares et PUPs. malwarebytes.com Malwarebytes Free Gratuit Analyse et suppression de logiciels malveillants. malwarebytes.com O&O ShutUp10++ Gratuit Gestion de paramètres de confidentialité Windows 10/11. oo-software.com"
 },
 {
  "id": "tool-clean",
  "page": "logiciels.html",
  "hash": "nettoyage-securite",
  "title": "Nettoyage & sécurité",
  "titleEn": "Cleaning & security",
  "text": "id=\"nettoyage-securite\" data-search-group data-en=\"Cleaning, disinfection and optimization\">Nettoyage, désinfection et optimisation Logiciel Licence Usage principal Site officiel BleachBit Open source Nettoyage de fichiers temporaires et caches. bleachbit.org Revo Uninstaller Gratuit (version limitée) Désinstallation et suppression des restes de programmes. revouninstaller.com BCUninstaller Open source Désinstallation par lots de logiciels et bloatwares. bcuninstaller.com AdwCleaner Gratuit Détection et suppression d’adwares et PUPs. malwarebytes.com Malwarebytes Free Gratuit Analyse et suppression de logiciels malveillants. malwarebytes.com O&O ShutUp10++ Gratuit Gestion de paramètres de confidentialité Windows 10/11. oo-software.com Recherche, système et registre Logiciel Licence Usage principal Site officiel Filelight Open source Visualiser graphiquement l’espace disque occupé. apps.kde.org Everything Gratuit Recherche instantanée de fichiers sous Windows. voidtools.com System Informer Open source Gestionnaire avancé de processus Windows. systeminformer.com LockHunter Gratuit Identifier les processus qui verrouillent un fichier. lockhunter.com TrID Gratuit Identifier le type d’un fichier sans extension. mark0.net"
 },
 {
  "id": "tool-system",
  "page": "logiciels.html",
  "hash": "systeme-recherche",
  "title": "Système & recherche",
  "titleEn": "System & search",
  "text": "id=\"systeme-recherche\" data-search-group data-en=\"Search, system and registry\">Recherche, système et registre Logiciel Licence Usage principal Site officiel Filelight Open source Visualiser graphiquement l’espace disque occupé. apps.kde.org Everything Gratuit Recherche instantanée de fichiers sous Windows. voidtools.com System Informer Open source Gestionnaire avancé de processus Windows. systeminformer.com LockHunter Gratuit Identifier les processus qui verrouillent un fichier. lockhunter.com TrID Gratuit Identifier le type d’un fichier sans extension. mark0.net Drivers et réseau Logiciel Licence Usage principal Site officiel Display Driver Uninstaller (DDU) Gratuit Nettoyage des pilotes graphiques. wagnardsoft.com Snappy Driver Installer Origin Open source Installation de pilotes, y compris hors ligne. sdi-tool.org Advanced IP Scanner Gratuit Analyse du réseau local. advanced-ip-scanner.com Nmap / Zenmap Open source Analyse de ports et audit réseau autorisé. nmap.org NetSpot / Wi-Fi Commander Gratuit (versions limitées) Analyse et cartographie du signal Wi-Fi. netspotapp.com"
 },
 {
  "id": "tool-network",
  "page": "logiciels.html",
  "hash": "pilotes-reseau",
  "title": "Pilotes & réseau",
  "titleEn": "Drivers & network",
  "text": "id=\"pilotes-reseau\" data-search-group data-en=\"Drivers and network\">Drivers et réseau Logiciel Licence Usage principal Site officiel Display Driver Uninstaller (DDU) Gratuit Nettoyage des pilotes graphiques. wagnardsoft.com Snappy Driver Installer Origin Open source Installation de pilotes, y compris hors ligne. sdi-tool.org Advanced IP Scanner Gratuit Analyse du réseau local. advanced-ip-scanner.com Nmap / Zenmap Open source Analyse de ports et audit réseau autorisé. nmap.org NetSpot / Wi-Fi Commander Gratuit (versions limitées) Analyse et cartographie du signal Wi-Fi. netspotapp.com Mots de passe et restauration Logiciel Licence Usage principal Site officiel Reset Windows Password Payant / selon édition Récupération d’accès Windows ; à utiliser uniquement avec autorisation. top-password.com chntpw / NTPWEdit Open source / gratuit Outils hors ligne autour des comptes Windows : n’utiliser que sur un appareil autorisé. projet chntpw"
 },
 {
  "id": "tool-password",
  "page": "logiciels.html",
  "hash": "acces-restauration",
  "title": "Accès & restauration",
  "titleEn": "Access & recovery",
  "text": "id=\"acces-restauration\" data-search-group data-en=\"Passwords and recovery\">Mots de passe et restauration Logiciel Licence Usage principal Site officiel Reset Windows Password Payant / selon édition Récupération d’accès Windows ; à utiliser uniquement avec autorisation. top-password.com chntpw / NTPWEdit Open source / gratuit Outils hors ligne autour des comptes Windows : n’utiliser que sur un appareil autorisé. projet chntpw Sauvegarde, clonage et récupération Logiciel Licence Usage principal Site officiel Clonezilla Open source Clonage et imagerie de disque. clonezilla.org TestDisk & PhotoRec Open source Récupération de partitions et de fichiers supprimés. cgsecurity.org FastCopy Gratuit / open source Copie rapide de données sous Windows. fastcopy.jp Kopia / Duplicati Open source Sauvegardes chiffrées et incrémentielles. kopia.io · duplicati.com"
 },
 {
  "id": "tool-backup",
  "page": "logiciels.html",
  "hash": "sauvegarde-recuperation",
  "title": "Sauvegarde & récupération",
  "titleEn": "Backup & recovery",
  "text": "id=\"sauvegarde-recuperation\" data-search-group data-en=\"Backup, cloning and recovery\">Sauvegarde, clonage et récupération Logiciel Licence Usage principal Site officiel Clonezilla Open source Clonage et imagerie de disque. clonezilla.org TestDisk & PhotoRec Open source Récupération de partitions et de fichiers supprimés. cgsecurity.org FastCopy Gratuit / open source Copie rapide de données sous Windows. fastcopy.jp Kopia / Duplicati Open source Sauvegardes chiffrées et incrémentielles. kopia.io · duplicati.com Réseau et téléassistance Logiciel Licence Usage principal Site officiel RustDesk Open source Prise en main à distance. rustdesk.com AnyDesk Gratuit (usage personnel) Logiciel de téléassistance à distance. anydesk.com AnyViewer Gratuit (version personnelle) Logiciel de téléassistance. anyviewer.com Firefox Portable Open source Navigateur autonome pour support USB. portableapps.com"
 },
 {
  "id": "tool-remote",
  "page": "logiciels.html",
  "hash": "teleassistance",
  "title": "Téléassistance",
  "titleEn": "Remote support",
  "text": "id=\"teleassistance\" data-search-group data-en=\"Network and remote support\">Réseau et téléassistance Logiciel Licence Usage principal Site officiel RustDesk Open source Prise en main à distance. rustdesk.com AnyDesk Gratuit (usage personnel) Logiciel de téléassistance à distance. anydesk.com AnyViewer Gratuit (version personnelle) Logiciel de téléassistance. anyviewer.com Firefox Portable Open source Navigateur autonome pour support USB. portableapps.com Archives, automatisation et bureautique Logiciel Licence Usage principal Site officiel 7-Zip Open source Gestionnaire d’archives. 7-zip.org Ninite Gratuit Installation automatisée de logiciels Windows. ninite.com WinGet Gratuit / intégré à Windows Gestionnaire de paquets Windows. Microsoft Learn Sumatra PDF Open source Lecteur PDF léger. sumatrapdfreader.org LibreOffice Open source Suite bureautique libre. libreoffice.org Rufus Open source Création de clés USB bootables Windows et Linux. rufus.ie Aucun résultat ne correspond à cette recherche. //INFO · BOÎTE À OUTILS Retour à l'accueil"
 },
 {
  "id": "tool-office",
  "page": "logiciels.html",
  "hash": "bureautique-utilitaires",
  "title": "Bureautique & utilitaires",
  "titleEn": "Office & utilities",
  "text": ""
 }
];
