using DatingApp.API.Data;
using DatingApp.API.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using System.Threading.Tasks;
using System.Security.Claims;
using DatingApp.API.Dtos;
using DatingApp.API.Models;
using System.Collections.Generic;
using System;

namespace DatingApp.API.Controllers
{
    [ServiceFilter(typeof(LogUserActivity))]
    [Authorize]
    [Route("api/users/{userId}/[controller]")]
    [ApiController]
    public class MessagesController: ControllerBase
    {
        private readonly IDatingRepository _repo;
        private readonly IMapper _mapper;

        public MessagesController(IDatingRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        [HttpGet("{id}", Name = "GetMessage")]
        public async Task<IActionResult> GetMessage(int userId, int id)
        {
            if(userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }

            var messageFromRepo = await _repo.GetMessage(id);
            if(messageFromRepo == null)
            {
                return NotFound();
            }
            return Ok(messageFromRepo);
        }

        [HttpGet]
        public async Task<IActionResult> GetMessagesForUser(int userId, 
        [FromQuery]MessageParams messageParams)
        {
            if(userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }

            messageParams.UserId = userId;

            var messagesFromRepo = await _repo.GetMessagesForUser(messageParams);

            var messes = _mapper.Map<IEnumerable<MessageToReturnDto>>(messagesFromRepo);

            Response.AddPagination(messagesFromRepo.CurrentPage, messagesFromRepo.PageSize,
             messagesFromRepo.TotalCount, messagesFromRepo.TotalPages);

             return Ok(messes);
        }
        
        [HttpGet("thread/{recipientId}")]
        public async Task<IActionResult> GetMessageThread( int userId, int recipientId)
        {
            if(userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }

            var messesFromRepo = await _repo.GetMessageThread(userId, recipientId);

            var messThread = _mapper.Map<IEnumerable<MessageToReturnDto>>(messesFromRepo);

            return Ok(messThread);

        }

        [HttpPost]
        public async Task<IActionResult> CreateMessage(int userId, MessageForCreationDto messageForCreationDto)
        {

            var sender = await _repo.GetUser(userId);

            if(sender.Id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }

            messageForCreationDto.SenderId = userId;

            var recipient = await _repo.GetUser(messageForCreationDto.RecipientId);

            if(recipient == null)
            {
                return BadRequest("Could not find user!");
            }

            var message = _mapper.Map<Message>(messageForCreationDto);

            _repo.Add(message);
     
            if(await _repo.SaveAll())
            {
                var messToRet = _mapper.Map<MessageToReturnDto>(message);
                return CreatedAtRoute("GetMessage", new {
                    userId, id = message.Id
                }, messToRet);
            }
            throw new System.Exception("Creating the message failed on save");
        }

        [HttpPost("{id}")]
        public async Task<IActionResult> DeleteMessage(int id, int userId)
        {
            if(userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }

            var messFromRepo = await _repo.GetMessage(id);

            if(messFromRepo.SenderId == userId)
            {
                messFromRepo.SenderDeleted = true;
            }

            if( messFromRepo.RecipientId == userId)
            {
                messFromRepo.RecipientDeleted = true;
            }

            if(messFromRepo.SenderDeleted && messFromRepo.RecipientDeleted)
            {
                _repo.Delete(messFromRepo);
            }

            if(await _repo.SaveAll())
            {
                return NoContent();
            }

            throw new System.Exception("Error deleting the message");

        }

        [HttpPost("{id}/read")]
        public async Task<IActionResult> MarkMessageAsRead(int userId, int id)
        {
            if(userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }

            var mess = await _repo.GetMessage(id);

            if(mess.RecipientId != userId)
            {
                return Unauthorized();
            }

            mess.IsRead = true;
            mess.DateRead = DateTime.Now;

            await _repo.SaveAll();

            return NoContent();

        }

    }
}