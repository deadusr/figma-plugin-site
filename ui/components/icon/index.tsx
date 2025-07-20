import { TIcons } from "./iconsTypes"
import Icon16ChevronDown from './icons/icon-16-chevron-down';
import Icon16Frame from './icons/icon-16-frame';
import Icon16Component from "./icons/icon-16-component";
import Icon24ClipboardSmall from "./icons/icon-24-clipboard-small";
import Icon24CodeSnippet from "./icons/icon-24-codeSnippet";
import Icon16Instance from "./icons/icon-16-instance";
import Icon16Check from "./icons/icon-16-check";
import Icon24ChevronDown from "./icons/icon-24-chevron-down";
import Icon16Folder from "./icons/icon-16-folder";
import Icon16Dev from "./icons/icon-16-dev";
import Icon16Image from "./icons/icon-16-image";

type Props = {
    icon: TIcons,
    className?: string,
}

const Icon = ({ icon, className }: Props) => {
    switch (icon) {
        case 'chevron.down.16':
            return <Icon16ChevronDown className={className} />
        case "frame.16":
            return <Icon16Frame className={className} />
        case 'component.16':
            return <Icon16Component className={className} />
        case 'instance.16':
            return <Icon16Instance className={className} />
        case 'check.16':
            return <Icon16Check className={className} />
        case 'folder.16':
            return <Icon16Folder className={className} />
        case 'dev.16':
            return <Icon16Dev className={className} />
        case 'image.16':
            return <Icon16Image className={className} />

        case 'codeSnippet.24':
            return <Icon24CodeSnippet className={className} />
        case 'clipboard.small.24':
            return <Icon24ClipboardSmall className={className} />
        case 'chevron.down.24':
            return <Icon24ChevronDown className={className} />
    }
}

export default Icon;