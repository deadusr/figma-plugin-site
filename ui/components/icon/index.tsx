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
import Icon16ComponentSet from "./icons/icon-16-componentset";
import Icon16Ellipse from "./icons/icon-16-ellipse";
import Icon16Line from "./icons/icon-16-line";
import Icon16Polygon from "./icons/icon-16-polygon";
import Icon16Rectangle from "./icons/icon-16-rectangle";
import Icon16Star from "./icons/icon-16-star";
import Icon16BooleanUnion from "./icons/icon-16-boolean-union";
import Icon16Group from "./icons/icon-16-group";
import Icon16Page from "./icons/icon-16-page";
import Icon16Text from "./icons/icon-16-text";
import Icon16Warning from "./icons/icon-16-warning";
import Icon16ComplexVector from "./icons/icon-16-complex-vector";
import Icon16ChevronRight from "./icons/icon-16-chevron-right";

type Props = {
    icon: TIcons,
    className?: string,
}

const Icon = ({ icon, className }: Props) => {
    switch (icon) {
        case 'chevron.down.16':
            return <Icon16ChevronDown className={className} />
        case 'chevron.right.16':
            return <Icon16ChevronRight className={className} />
        case "frame.16":
            return <Icon16Frame className={className} />
        case 'component.16':
            return <Icon16Component className={className} />
        case 'componentset.16':
            return <Icon16ComponentSet className={className} />
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
        case 'ellipse.16':
            return <Icon16Ellipse className={className} />
        case 'line.16':
            return <Icon16Line className={className} />
        case 'polygon.16':
            return <Icon16Polygon className={className} />
        case 'rectangle.16':
            return <Icon16Rectangle className={className} />
        case 'star.16':
            return <Icon16Star className={className} />
        case 'boolean.union.16':
            return <Icon16BooleanUnion className={className} />
        case 'group.16':
            return <Icon16Group className={className} />
        case 'page.16':
            return <Icon16Page className={className} />
        case 'text.16':
            return <Icon16Text className={className} />
        case 'warning.16':
            return <Icon16Warning className={className} />
        case 'complex.vector.16':
            return <Icon16ComplexVector className={className} />

        case 'codeSnippet.24':
            return <Icon24CodeSnippet className={className} />
        case 'clipboard.small.24':
            return <Icon24ClipboardSmall className={className} />
        case 'chevron.down.24':
            return <Icon24ChevronDown className={className} />
    }
}

export default Icon;