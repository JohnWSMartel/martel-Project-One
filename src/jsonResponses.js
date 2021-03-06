const birds = {};

const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

const birdList = (request, response) => {
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
    let requestedBirds = {};
    
    //if(params.look)
    
    let birdIndexes = Object.keys(birds);
    if(params.name){
        for(let i = 0; i< birdIndexes.length; i++){
            let currentBird = birds[birdIndexes[i]];
            if(currentBird.name === params.name){
              requestedBirds[currentBird.name] = currentBird;
            }
        }
    } else if(params.color){
        for(let i = 0; i< birdIndexes.length; i++){
            let currentBird = birds[birdIndexes[i]];
            if(currentBird.color === params.color){
              requestedBirds[currentBird.name] = currentBird;
            }
        }
    };
  
    const responseJSON = {
      birds: requestedBirds
    };
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
  birdList,
  badRequest,
  notFound,
  getBirds,
  getBirdsMeta,
  addBird,
};
