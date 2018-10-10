const fs = require("fs");
const parseJson = require("parse-json");
const configPath = "./artifacts/";
const artifactsFilePath = configPath + "artifacts.json";

getObjectConfig = objectName => {
  const { objects } = getArtifactConfig();
  let final;

  for (let obj in objects) {
    final = objects[obj].find(name => {
      if (name === objectName) return true;
    });
    if (final != undefined) {
      return { objectName: objectName, objectType: obj };
    }
  }
  return final;
};

updateArtifacteConfig = object => {
  if (!getObjectConfig(object.name)) {
    let artifactConfig = getArtifactConfig();
    artifactConfig.objects[object.type].push(object.name);
    const artifactConfigJSON = JSON.stringify(artifactConfig);
    fs.writeFile(artifactsFilePath, artifactConfigJSON, err => {
      if (err) throw err;
    });
  }
  const objectJSON = JSON.stringify(object);
  const path =
    configPath + "objects/" + object.type + "/" + object.name + ".json";
  fs.writeFile(path, objectJSON, err => {
    if (err) throw err;
  });
  return object;
};

deleteArtifacteConfig = name => {
  if (getObjectConfig(name)) {
    const { objectName, objectType } = getObjectConfig(name);
    let artifactConfig = getArtifactConfig();
    let objects = artifactConfig.objects[objectType];
    objects = objects.filter(item => item !== objectName);
    artifactConfig.objects[objectType] = objects;
    const artifactConfigJSON = JSON.stringify(artifactConfig);
    fs.writeFile(artifactsFilePath, artifactConfigJSON, err => {
      if (err) throw err;
    });
    const path =
      configPath + "objects/" + objectType + "/" + objectName + ".json";

    fs.unlink(path, err => {
      if (err) throw err;
    });
  }
  /* Delete file location */
};

getArtifactConfig = artifact => {
  if (artifact) {
    const { objectName, objectType } = getObjectConfig(artifact);
    const data = fs.readFileSync(
      configPath + "objects/" + objectType + "/" + objectName + ".json",
      "utf8"
    );
    return parseJson(data);
  }
  const data = fs.readFileSync(artifactsFilePath, "utf8");
  return parseJson(data);
};

module.exports.getArtifactConfig = getArtifactConfig; //Completed..!

module.exports.updateArtifacteConfig = updateArtifacteConfig; //completed..!

module.exports.deleteArtifacteConfig = deleteArtifacteConfig; //completed..!
