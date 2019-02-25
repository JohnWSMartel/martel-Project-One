const birds = {};

const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

const success = (request, response) => {
  const responseJSON = {
    birds,
  };

  respondJSON(request, response, 200, responseJSON);
};

const badRequest = (request, response, params) => {
  const responseJSON = {
    message: 'This request has the required parameters.',
  };

  if (!params.valid || params.valid !== 'true') {
    responseJSON.message = 'Missing valid query parameter set to true.';
    responseJSON.id = 'badRequest';
    return respondJSON(request, response, 400, responseJSON);
  }

  return respondJSON(request, response, 200, responseJSON);
};

const notFound = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  return respondJSON(request, response, 404, responseJSON);
};

const respondJSONMeta = (request, response, status) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  response.writeHead(status, headers);
  response.end();
};

const getBirds = (request, response, params) => {
  
    const requestedBirds = {};
    
    if(params.nameField){
        for(let i = 0; i<birds.length; i++){
            let currentBird = birds[i];
            if(currentBird.name === params.nameField){
                requestedBirds.push(currentBird);
            }
        }
        
        birds.foreach(birds.Name){//loop to go through bird name
            if(params.nameField === birds.Name){//the name put in matches the name given
               //put the names in a requestedBirds
               requestedBirds.push(birds[i]);
               };
        };
    } else if(params.colorField){
        
    };
    const responseJSON = requestedBirds;
  return respondJSON(request, response, 200, responseJSON);
};

const getBirdsMeta = (request, response) => {
  respondJSONMeta(request, response, 200);
};

const addBird = (request, response, body) => {
  const responseJSON = { message: 'Name and color are both required.' };

  if (!body.name || !body.color) {
    responseJSON.id = 'missingParams';
    return respondJSON(request, response, 400, responseJSON);
  }

  let responseCode = 201;

  if (birds[body.name]) {
    responseCode = 204;
  } else {
    birds[body.name] = {};
  }

  birds[body.name].name = body.name;
  birds[body.name].color = body.color;

  if (responseCode === 201) {
    responseJSON.message = 'Created Successfully';
    return respondJSON(request, response, responseCode, responseJSON);
  }

  return respondJSONMeta(request, response, responseCode);
};

module.exports = {
  success,
  badRequest,
  notFound,
  getBirds,
  getBirdsMeta,
  addBird,
};
