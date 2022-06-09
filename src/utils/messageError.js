export default function messageError(message, res, error){
    console.log(`${message}:`, error);
    res.status(500).send(
      { error: `Internal server. ${message}` }
    );
}