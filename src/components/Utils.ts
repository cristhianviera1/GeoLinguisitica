export const LanguagesFromData = (features = [], languageProp: string = 'lengua'): string[] => {
    let languages: string[] = [];
    features.forEach(({properties: {languageProp}}) => {
        if (languages.indexOf(languageProp) === -1) {
            languages.push(String(languageProp));
        }
    })
    languages.sort();
    return languages;
};