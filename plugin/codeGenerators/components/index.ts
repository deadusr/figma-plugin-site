const booleans = ["true", "false"];


export const generateProps = (properties: ComponentProperties) => {
    const props = Object.keys(properties).map(key => {
        const prop = properties[key];
        const name = getName(key);

        switch (prop.type) {
            case 'BOOLEAN':
            case 'TEXT':
                return { name, value: prop.value }

            case 'VARIANT':
                const value = (prop.value as string).toLowerCase();
                if (booleans.includes(value)) {
                    const boolVal = value === "true";
                    return {
                        name,
                        value: boolVal
                    };
                }

                return { name, value: `"${value}"` };


            case 'INSTANCE_SWAP':
                console.log("DOESNT'T WORK WITH INSTANCE SWAP")
                return null

        }


    })

    return props.filter(el => el !== null);
}


const getName = (figmaPropName: string) => {
    return figmaPropName.split("#")[0];
}