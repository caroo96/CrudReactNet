using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProyectoCRUD.Models;

namespace ProyectoCRUD.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactoController : ControllerBase
    {
        private readonly ApiCrudContext _dbcontext;

        //constructor
        public ContactoController(ApiCrudContext context)
        {
            _dbcontext = context;
        }
        //Crearción de metodos

        //Metodo para obtener lista de contactos

        [HttpGet]
        [Route("Lista")]
        public async Task<IActionResult> Lista()
        {
            List<Contacto> lista = await _dbcontext.Contactos.OrderByDescending(c => c.IdContacto).ToListAsync();

            return StatusCode(StatusCodes.Status200OK, lista);
        }
            //Metodo para guardar contacto
            [HttpPost]
            [Route("Guardar")]
            public async Task<IActionResult> Guardar([FromBody] Contacto request)
            {
                await _dbcontext.Contactos.AddAsync(request);
                await _dbcontext.SaveChangesAsync();
                return StatusCode(StatusCodes.Status200OK, "Ok");
            }

            //Metodo para actualizar los contactos
            [HttpPut]
            [Route("Editar")]
            public async Task<IActionResult> Editar([FromBody] Contacto request)
            {
                _dbcontext.Contactos.Update(request);
                await _dbcontext.SaveChangesAsync();
                return StatusCode(StatusCodes.Status200OK, "Ok");
            }

            //Metodo para actualizar los contactos
            [HttpDelete]
            [Route("Eliminar/{id:int}")]
            public async Task<IActionResult> Eliminar(int id)
            {
                Contacto contacto = _dbcontext.Contactos.Find(id);
                _dbcontext.Contactos.Remove(contacto);
                await _dbcontext.SaveChangesAsync();

                return StatusCode(StatusCodes.Status200OK, "Ok");
            }
        }
    }
